
import Models from '../libs/Models.class';
import type { ModelDeclaration } from '../libs/Models.class';

export default interface Contact {
  prename: string
  name: string
  email: string
  phone: string
  message: string
  type: string
  category: string
  osm_id: number
  street: string
  streetNumber: string
  city: string
  zipcode: string
  country: string
  addressAddition: string
}

const declaration: ModelDeclaration<Contact> = {
  prename        : { type: 'string' },
  name           : { type: 'string' },
  email          : { type: 'string' },
  phone          : { type: 'string' },
  message        : { type: 'string' },
  type           : { type: 'string' },
  category       : { type: 'string' },
  osm_id         : { type: 'number' },
  street         : { type: 'string' },
  streetNumber   : { type: 'string' },
  city           : { type: 'string' },
  zipcode        : { type: 'string' },
  country        : { type: 'string' },
  addressAddition: { type: 'string' },
};

Models.register('contact', declaration);
