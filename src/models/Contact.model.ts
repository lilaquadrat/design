
import Models, { ModelDeclaration } from '@libs/Models.class';

export default interface Contact {
  prename: string
  lastname: string
  streetNumber: string
  city: string
  country: string
  email: string
  phone: string
  termsAccepted: boolean
}

const declaration: ModelDeclaration<Contact> = {
  prename: { type: 'string' },
  lastname: { type: 'string' },
  streetNumber: { type: 'string' },
  city: { type: 'string' },
  country: { type: 'string' },
  email: { type: 'string' },
  phone: { type: 'string' },
  termsAccepted: { type: 'boolean', default: false },
};

Models.register('contact', declaration);
