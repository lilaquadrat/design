import vue from 'vue';

/**
 *
 *
 * @class Translation
 */
class Translation {

  /**
     *
     *
     * @type {{[key: string]: any}}
     * @memberof Translation
     */
  translations: { [key: string]: any } = {};

  /**
     *
     *
     * @type {string}
     * @memberof Translation
     */
  current: string = 'en';

  /**
     *
     *
     * @param {string} value
     * @param {string} [key] hinting a specific language
     * @param {string} [hint]
     * @returns
     * @memberof Translation
     */
  translate(value: string, key?: string, hint?: string, values?: (string | number)[]) {

    let returnValue: string;
    const translation = key && this.exists(key)
      ? this.translations[key]
      : this.translations[this.current];

    if (!translation) return value;

    if (hint) {

      if (translation[hint]) {

        returnValue = translation[hint][value]
          ? translation[hint][value]
          : value;

      } else {

        returnValue = value;

      }

    } else {

      returnValue = translation[value]
        ? translation[value]
        : value;

    }

    if (values) {

      returnValue = values.reduce((p, c) => p.replace(/%s/, c), returnValue);

    }


    return returnValue;

  }

  isset(key: string) {

    const translation = this.translations[this.current];

    if (!translation) return false;

    return !!translation[key];

  }

  /**
     *
     *
     * @param {{[key: string]: any}} translation
     * @param {string} key
     * @memberof Translation
     */
  add(translation: Record<string, string>, key: string) {

    this.translations[key] = translation;

  }

  extend(translations: Record<string, string>, key: string) {

    this.translations[key] = { ...this.translations[key], ...translations };

  }

  /**
     *
     *
     * @param {string} key
     * @returns
     * @memberof Translation
     */
  exists(key: string) {

    return !!this.translations[key];

  }

  /**
     *
     *
     * @param {string} key
     * @memberof Translation
     */
  select(key: string) {

    this.current = key;

  }

}

const translate = new Translation();

vue.filter('translate', (value: string, values?: string[]) => translate.translate(value, null, null, values));

export default translate;
