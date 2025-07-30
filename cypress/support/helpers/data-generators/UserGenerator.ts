import { TestUser, ShippingAddress } from '../../types/common';
import { faker } from '@faker-js/faker'; // npm install @faker-js/faker --save-dev

export class UserGenerator {
  /**
   * Generate a random test user
   */
  static generateTestUser(): TestUser {
    return {
      email: faker.internet.email(),
      password: 'TestPass123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };
  }

  /**
   * Generate a valid UK shipping address
   */
  static generateUKShippingAddress(): ShippingAddress {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number('07### ######'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode('## ###'),
      country: 'United Kingdom'
    };
  }

  /**
   * Generate shipping address for specific country
   */
  static generateShippingAddress(country: string): ShippingAddress {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode(),
      country
    };
  }
}