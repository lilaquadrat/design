
import Models from '../libs/Models.class';
import type { ModelDeclaration } from '../libs/Models.class';

export default interface Address {
  osm_id: number
  street: string
  streetNumber: string
  city: string
  zipcode: string
  country: string
  addressAddition: string
}

const declaration: ModelDeclaration<Address> = {
  osm_id         : { type: 'number' },
  street         : { type: 'string' },
  streetNumber   : { type: 'string' },
  city           : { type: 'string' },
  zipcode        : { type: 'string' },
  country        : { type: 'string' },
  addressAddition: { type: 'string' },
};

Models.register('address', declaration);
