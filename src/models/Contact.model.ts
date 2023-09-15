
import Models, { ModelDeclaration } from '@libs/Models.class';

export default interface Contact {
  prename: string
  name: string
  streetNumber: string
  city: string
  zipcode: string
  country: string
  email: string
  phone: string
  message: string
  type: string
  category: string
}

const declaration: ModelDeclaration<Contact> = {
  prename: { type: 'string' },
  name: { type: 'string' },
  streetNumber: { type: 'string' },
  city: { type: 'string' },
  zipcode: { type: 'string' },
  country: { type: 'string' },
  email: { type: 'string' },
  phone: { type: 'string' },
  message: { type: 'string' },
  type: { type: 'string' },
  category: { type: 'string' },
};

Models.register('contact', declaration);
