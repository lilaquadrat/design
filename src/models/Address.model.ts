
import Models, { ModelDeclaration } from '@libs/Models.class';

export default interface Address {
  streetNumber: string
  city: string
  zipcode: string
  country: string
}

const declaration: ModelDeclaration<Address> = {
  streetNumber: { type: 'string' },
  city: { type: 'string' },
  zipcode: { type: 'string' },
  country: { type: 'string' },
};

Models.register('address', declaration);
