import { v4 as uuid } from 'uuid';
import type GenericModel from '@interfaces/GenericModel.interface';
import hardCopy from '../mixins/hardCopy';

type DeclarationTypes = 'string' | 'number' | 'boolean' | 'object';
type SingleDeclaration = { type: 'string', default?: string } |
{ type: 'number', default?: number } |
{ type: 'boolean', default?: boolean } |
{ type: 'object', default?: Record<string, any> } |
{ type: 'array', contains: { type: DeclarationTypes }, default?: (string | number | boolean)[] } |
{ type: 'array', contains: { model: string }, default?: any[], defaultItems?: number } |
{ model: string, default?: any };

// interface ModelDeclaration<T = GenericModel> {
//   [key in keyof T]: SingleDeclaration
// }

type ModelDeclaration<T = GenericModel> = Record<keyof T, SingleDeclaration>;
type ModelDeclarationExtended<T, E> = Record<Exclude<keyof T, keyof E>, SingleDeclaration>;

interface ModelOptions {
  /**
   * uuid will be automatically added
   */
  uuid?: boolean
  /**
   * the name of the models will be added as type
  ```TS
    type: 'text-module'
  ```
   */
  nameAsType?: boolean

  /**
   * defines which available model should be used as base
   */
  extends?: string
}
// eslint-disable-next-line no-unused-vars
type ModelHook<T> = (data: T) => void;

interface ModelHooks<T> {
  legacy?: ModelHook<T>
  preSave?: ModelHook<T>
  // postSave?: ModelHook<T>
  preAdd?: ModelHook<T>
  // postAdd?: ModelHook<T>
  preClone?: ModelHook<T>
  // postClone?: ModelHook<T>
}

class Models {

  registeredModels: string[] = [];

  declarations: Record<string, ModelDeclaration> = {};

  options: Record<string, ModelOptions> = {};

  hooks: Record<string, ModelHooks<unknown>> = {};

  debug: boolean = false;

  constructor (debug: boolean = false) {

    this.debug = debug;

  }

  // eslint-disable-next-line no-unused-vars
  register<T>(name: string, declaration: ModelDeclaration<T>, hooks?: ModelHooks<T>, options?: ModelOptions): void;

  // eslint-disable-next-line no-unused-vars
  register<T, E>(name: string, declaration: ModelDeclarationExtended<T, E>, hooks: ModelHooks<T> | undefined, options: ModelOptions): void;

  register<T, E> (name: string, declaration: ModelDeclaration | ModelDeclarationExtended<T, E>, hooks: ModelHooks<T> | undefined, options?: ModelOptions) {

    if (this.debug) console.debug(`registed model ${name}`);
    // this.registeredModels[name] = declaration;
    this.registeredModels.push(name);
    this.declarations[name] = options?.extends ? this.extendDeclaration(declaration, options.extends) : declaration;
    this.options[name] = options;
    this.hooks[name] = hooks;

  }

  getDeclaration (name: string): ModelDeclaration {

    if (!this.declarations[name]) console.error(`DECLARATION_NOT_FOUND - ${name}`);

    return this.declarations[name];

  }

  getOptions (name: string): ModelOptions {

    return this.options[name];

  }

  extendDeclaration (declaration: ModelDeclaration, extendBase: string) {

    const base = this.getDeclaration(extendBase);

    if (!base) throw new Error('MODELS_EXTENDS_BASE_NOT_FOUND');

    return { ...base, ...declaration };

  }

  prepareTargetObject<T> (name: string, data: T & { uuid?: string }, usecase?: 'save' | 'add' | 'clone') {

    const targetObject: GenericModel = {};
    const options = this.getOptions(name);

    if (options?.uuid) {

      if (usecase === 'clone') {

        targetObject.uuid = uuid();

      } else {

        targetObject.uuid = data.uuid || uuid();

      }

    }

    if (options?.nameAsType) {

      targetObject.type = name;

    }

    return targetObject;

  }


  add<T> (data: Partial<T>, name: string): T {


    const modelData = this.setDataV2(data, this.prepareTargetObject(name, data, 'add'), this.getDeclaration(name), name, 'add');

    // if (this.hooks[name]?.preAdd) this.hooks[name].preAdd(modelData);

    return modelData as T;

  }

  save<T> (data: Partial<T>, name: string): T {


    const modelData = this.setDataV2(data, this.prepareTargetObject(name, data, 'save'), this.getDeclaration(name), name, 'save') as T;

    // if (this.hooks[name]?.postSave) this.hooks[name].postSave(modelData);

    return modelData as T;

  }

  clone<T> (data: Partial<T>, name: string): T {

    const modelData = this.setDataV2(data, this.prepareTargetObject(name, data, 'clone'), this.getDeclaration(name), name, 'clone') as T;

    // if (this.hooks[name].postClone) this.hooks[name].postClone(data);

    return modelData as T;

  }

  setDataV2<T> (data: Partial<T>, targetObject: GenericModel | GenericModel[], declaration: ModelDeclaration, name: string, usecase: 'save' | 'add' | 'clone') {

    if (this.debug) console.debug(data, declaration, targetObject, usecase);

    const keys = Object.keys(declaration || {});


    // if (typeof this.legacy === 'function' && legacy) {

    //   if (data) data = this.legacy(data);

    // }

    // if (typeof this.onSave === 'function' && usecase === 'save') {

    //   if (data) data = this.onSave(data);

    // }

    if (usecase === 'save') {

      if (this.hooks[name]?.preSave) this.hooks[name].preSave(data);

    }

    if (usecase === 'clone') {

      if (this.hooks[name]?.preClone) this.hooks[name].preClone(data);

    }

    if (usecase === 'add') {

      if (this.hooks[name]?.preAdd) this.hooks[name].preAdd(data);

    }

    if (usecase === 'save' && Models.isEmpty(data)) return targetObject;

    // remove the changed flag on save
    // if (usecase === 'save') {

    // delete this.changed;

    // }

    // delete this.legacy;
    // delete this.onSave;
    // delete this.onAdd;

    keys.forEach((keyName: string) => {

      if (this.debug) console.debug('START', keyName, data, declaration, declaration[keyName]);

      const currentDeclaration = declaration[keyName];
      let currentData: any;
      let safeData: Partial<T>;

      if (data && !Models.isEmpty(data)) safeData = hardCopy<Partial<T>>(data);
      if (safeData && safeData[keyName]) currentData = hardCopy(safeData[keyName]);

      if (usecase === 'save' && Models.isEmpty(currentData)) return;


      /**
      * SPECIAL CASE type
      * dont override the type of the module
      */
      // if (name === 'type' && currentData) {

      //   targetObject.type = currentData;
      //   return;

      // }

      if ('type' in currentDeclaration) {

        if (currentData) {

          // eslint-disable-next-line valid-typeof
          if (this.debug) console.debug('CHECK CURRENTDATA TYPE', typeof currentData === currentDeclaration.type, currentDeclaration.type, keyName, currentData, currentDeclaration);

          // eslint-disable-next-line valid-typeof
          if (typeof currentData !== currentDeclaration.type && currentDeclaration.type !== 'array' && !Models.isModel(currentDeclaration)) currentData = undefined;

        }


        /**
        * if usecase is save an no data is given, dont add default values
        */
        if (usecase === 'save' && Models.isEmpty(currentData)) {

          // delete declaration[name];
          return;

        }

        // if (name === 'legacy') return targetObject;
        // if (name === 'onSave') return targetObject;


        /**
        * string and number gets assigned
        */
        if (['string', 'number', 'boolean', 'object'].includes(currentDeclaration.type)) {

          targetObject[keyName] = currentData || Models.getDefaultValue(currentDeclaration);

        }

        /**
        * array
        */
        if (currentDeclaration.type === 'array') {

          const arrayContains = currentDeclaration.contains;

          if ('type' in arrayContains) {


            if (['string', 'number'].includes(arrayContains.type)) {

              if (this.debug) console.debug('SET ARRAY STRING/NUMBER', currentData);

              targetObject[keyName] = currentData?.slice(0) || Models.getDefaultValue(currentDeclaration);

            }

            if (arrayContains.type === 'object') {

              targetObject[keyName] = [];

              // only add non empty objects to the array
              currentData?.forEach((single) => {

                // skip if single is empty
                if (usecase === 'save' && Models.isEmpty(single)) return;

                // only add if the result is not empty
                if (!Models.isEmpty(single)) targetObject[keyName].push(single);

              });

              if (!targetObject[keyName].length) delete targetObject[keyName];

            }


          }

          if ('model' in arrayContains) {

            if (this.debug) console.debug('SET ARRAY MODEL', keyName, currentData, arrayContains?.model);

            targetObject[keyName] = [];

            if (this.debug) console.debug(keyName, currentData);

            /**
             * currentdata could be an array with an empty object [{}] which will not count as empty for the Model.isEmpty function
             * therefore we need to handle the possible empty data here
             */

            if (currentData) {

              currentData?.forEach((single) => {

                // skip if single is empty
                if (usecase === 'save' && Models.isEmpty(single)) return;

                const pushData = this.setDataV2(single, {}, this.getDeclaration(arrayContains?.model), arrayContains?.model, usecase);

                // only add if the result is not empty
                if (!Models.isEmpty(pushData)) targetObject[keyName].push(pushData);

              });

              if (!targetObject[keyName].length) delete targetObject[keyName];

            } else if (usecase !== 'save') {

              targetObject[keyName].push(this.setDataV2({}, {}, this.getDeclaration(arrayContains?.model), arrayContains?.model, usecase));

            }

            if ('defaultItems' in currentDeclaration && usecase !== 'save') {

              if (targetObject[keyName].length < currentDeclaration.defaultItems) {

                const neededItems = currentDeclaration.defaultItems - targetObject[keyName].length;

                for (let index = 0; index < neededItems; index += 1) {

                  targetObject[keyName].push(this.setDataV2({}, {}, this.getDeclaration(arrayContains?.model), arrayContains?.model, usecase));

                }

              }

            }

          }

        }

      }


      /**
      * if its an object, it will be a child model
      */
      if ('model' in currentDeclaration) {

        if (this.debug) console.debug('its a model', keyName, currentDeclaration, currentDeclaration?.model, targetObject);

        // if (usecase === 'save' && (!currentData || (Array.isArray(currentData) && !currentData.length))) {

        //   // delete declaration[name];
        //   return;

        // 

        targetObject[keyName]= this.setDataV2(currentData, {}, this.getDeclaration(currentDeclaration?.model), currentDeclaration?.model, usecase);

        if (usecase === 'save') {

          if (this.debug) console.debug(124, this[name], Object.keys(this[name]).length);

          if (Models.isEmpty(targetObject[keyName])) {

            delete targetObject[keyName];


          }

        }

      }

    });

    return targetObject;

  }

  static isEmpty (data: any[] | Record<string, any>) {

    if (!data) return true;

    if (Array.isArray(data)) {

      return !data.length;

    }

    if (typeof data === 'object') {

      return !Object.keys(data).length;

    }


    return false;

  }

  static isModel (declaration: SingleDeclaration) {

    return 'model' in declaration;

  }

  static getDefaultValue (declaration: SingleDeclaration) {

    if (declaration.default) {

      return declaration.default;

    }

    if ('type' in declaration) {


      if (declaration.type === 'string') {

        return '';

      }

      if (declaration.type === 'number') {

        return 0;

      }

      if (declaration.type === 'boolean') {

        return false;

      }

      if (declaration.type === 'array') {

        return [];

      }

    }

    return null;


  }


}

const ModelsClass = new Models();

export default ModelsClass;
export {
  Models, ModelDeclaration, ModelDeclarationExtended, ModelOptions, ModelHooks,
};
