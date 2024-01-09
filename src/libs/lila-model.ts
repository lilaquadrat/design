export abstract class PartialModel {

  /**
     * defines the type of the module
     *
     * @type {string}
     * @memberof ModuleModel
     */
  type: string;

  setData(data?: ModuleGeneric) {

    const keys = Object.getOwnPropertyNames(this);

    keys.map((name: string) => {

      let currentData: any;

      if (data) currentData = data[name];
      /**
             * dont override the type of the module
            */
      if (name === 'type') return;
      // if (data[name] === undefined) return;

      /**
             * string and number gets assigned
            */
      if (typeof (this[name]) === 'string' || typeof (this[name]) === 'number') {

        if (typeof currentData !== 'undefined') {

          this[name] = currentData;

        }

      }

      /**
             * if its a ModuleModel, it has the be initialized
            */
      if (typeof (this[name]) === 'function') {

        const newClass: ModuleModel = new this[name]();

        currentData
          ? this[name] = newClass.setData(data[name])
          : this[name] = newClass.setData();

      }

      /**
             * if its a empty array clone it ( without reference )
            */
      if (typeof (this[name]) === 'object' && this[name].length === 0) {

        if (currentData) this[name] = currentData.slice(0);

      }

      /**
             * check if array. object with a length is an array
            */
      if (Array.isArray(this[name])) {

        /**
                 * check if first element is a function
                 * if so, it should be a ModuleModel
                */
        if (typeof this[name][0] === 'function') {

          let modelClass: new (...args: any[]) => ModuleModel | PartialModel;

          /**
                     * map the array of models
                    */
          this[name].map((model: ModuleModel, index: number) => {

            let newClass: ModuleModel | PartialModel;
            let data: ModuleModel | PartialModel;

            modelClass = this[name][index];

            try {

              newClass = new this[name][index]();

            } catch (e) {

              console.error(name, this[name], data, this);
              return;

            }

            if (currentData) {

              if (typeof currentData[index] !== 'undefined') {

                data = currentData[index];
                /**
                                 * push the new model and data to the array
                                 * if the entry is a string, push only the string. then its a array of string, no model required
                                */
                if (typeof data !== 'string') data = newClass.setData(data);

              } else {

                data = newClass.setData();

              }

            } else {

              data = newClass.setData();

            }

            this[name][index] = data;

          });

          if (currentData) {

            /**
                         * if the currentData has more items than the model,
                         * add every item with the base model
                        */
            if (currentData.length > this[name].length) {

              currentData.slice(this[name].length).map((data: ModuleModel | PartialModel) => {

                let newClass: ModuleModel | PartialModel;

                try {

                  newClass = new modelClass();

                } catch (e) {

                  console.error(name, this[name], data, this);
                  return;

                }

                this[name].push(newClass.setData(data));

              });

            }

          }

        }

      }

    });

    return this;

  }

}

export abstract class ModuleModel extends PartialModel {

  id: string = '';

  variant: string[] = [];

}

export abstract class ListElementModel extends PartialModel {

  id: string = '';

  variant: string[] = [];

  isEmpty: () => boolean;

}
