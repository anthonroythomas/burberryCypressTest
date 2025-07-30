import { faker } from '@faker-js/faker';

export class DataFactory {
  // User data generators
  static generateUser(overrides: Partial<any> = {}): any {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'TestPassword123!',
      phone: faker.phone.number(),
      dateOfBirth: faker.date.past({ years: 30 }).toISOString().split('T')[0],
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      ...overrides
    };
  }
  
  static generateAdmin(overrides: Partial<any> = {}): any {
    return {
      ...this.generateUser(),
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      ...overrides
    };
  }
  
  // Product data generators
  static generateProduct(overrides: Partial<any> = {}): any {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      inStock: faker.datatype.boolean(),
      quantity: faker.number.int({ min: 0, max: 100 }),
      tags: faker.helpers.arrayElements([
        'electronics', 'clothing', 'books', 'home', 'sports'
      ], { min: 1, max: 3 }),
      images: [faker.image.url(), faker.image.url()],
      ...overrides
    };
  }
  
  // Order data generators
  static generateOrder(overrides: Partial<any> = {}): any {
    return {
      orderId: faker.string.uuid(),
      userId: faker.string.uuid(),
      items: [
        {
          productId: faker.string.uuid(),
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: parseFloat(faker.commerce.price())
        }
      ],
      totalAmount: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      status: faker.helpers.arrayElement(['pending', 'confirmed', 'shipped', 'delivered']),
      orderDate: faker.date.recent().toISOString(),
      shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode()
      },
      paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer']),
      ...overrides
    };
  }
  
  // Company data generators
  static generateCompany(overrides: Partial<any> = {}): any {
    return {
      name: faker.company.name(),
      industry: faker.company.buzzNoun(),
      website: faker.internet.url(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      employees: faker.number.int({ min: 1, max: 10000 }),
      revenue: faker.number.int({ min: 100000, max: 10000000 }),
      ...overrides
    };
  }
  
  // Event data generators
  static generateEvent(overrides: Partial<any> = {}): any {
    const startDate = faker.date.future();
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000);
    
    return {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        coordinates: {
          lat: parseFloat(faker.location.latitude()),
          lng: parseFloat(faker.location.longitude())
        }
      },
      organizer: faker.person.fullName(),
      category: faker.helpers.arrayElement(['conference', 'workshop', 'meetup', 'webinar']),
      maxAttendees: faker.number.int({ min: 10, max: 1000 }),
      price: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
      ...overrides
    };
  }
  
  // Form data generators
  static generateContactForm(overrides: Partial<any> = {}): any {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.words(5),
      message: faker.lorem.paragraph(3),
      phone: faker.phone.number(),
      company: faker.company.name(),
      ...overrides
    };
  }
  
  static generateRegistrationForm(overrides: Partial<any> = {}): any {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      phone: faker.phone.number(),
      agreeToTerms: true,
      newsletter: faker.datatype.boolean(),
      ...overrides
    };
  }
  
  // Payment data generators
  static generateCreditCard(overrides: Partial<any> = {}): any {
    return {
      number: '4111111111111111', // Test card number
      expiryMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
      expiryYear: faker.number.int({ min: 2024, max: 2030 }).toString(),
      cvv: faker.number.int({ min: 100, max: 999 }).toString(),
      holderName: faker.person.fullName(),
      billingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode()
      },
      ...overrides
    };
  }
  
  // API response generators
  static generateApiResponse(data: any, overrides: Partial<any> = {}): any {
    return {
      success: true,
      data: data,
      message: 'Operation completed successfully',
      timestamp: new Date().toISOString(),
      requestId: faker.string.uuid(),
      ...overrides
    };
  }
  
  static generateErrorResponse(overrides: Partial<any> = {}): any {
    return {
      success: false,
      error: {
        code: faker.helpers.arrayElement(['VALIDATION_ERROR', 'NOT_FOUND', 'UNAUTHORIZED', 'SERVER_ERROR']),
        message: faker.lorem.sentence(),
        details: faker.lorem.paragraph()
      },
      timestamp: new Date().toISOString(),
      requestId: faker.string.uuid(),
      ...overrides
    };
  }
  
  // Utility methods
  static generateArray<T>(generator: () => T, count: number = 5): T[] {
    return Array.from({ length: count }, generator);
  }
  
  static generateRandomChoice<T>(choices: T[]): T {
    return faker.helpers.arrayElement(choices);
  }
  
  static generateId(): string {
    return faker.string.uuid();
  }
  
  static generateSlug(text?: string): string {
    const baseText = text || faker.lorem.words(3);
    return baseText.toLowerCase().replace(/\s+/g, '-');
  }
  
  static generateTimestamp(past = false): string {
    const date = past ? faker.date.past() : faker.date.future();
    return date.toISOString();
  }
  
  // Seed data for consistent testing
  static seedRandom(seed: number): void {
    faker.seed(seed);
  }
  
  // Test scenarios
  static generateTestScenarios(): any {
    return {
      validUser: this.generateUser(),
      invalidUser: this.generateUser({ email: 'invalid-email' }),
      adminUser: this.generateAdmin(),
      emptyForm: {},
      specialCharacters: {
        name: '!@#$%^&*()',
        email: 'test+special@example.com',
        description: '<script>alert("xss")</script>'
      },
      longData: {
        name: 'A'.repeat(1000),
        description: 'B'.repeat(5000)
      },
      unicodeData: {
        name: '测试用户',
        description: '这是一个测试描述 🚀 émojis and spëcial chars'
      }
    };
  }
  
  // Database fixtures
  static generateDatabaseFixture(tableName: string, count: number = 10): any[] {
    const generators: Record<string, () => any> = {
      users: () => this.generateUser(),
      products: () => this.generateProduct(),
      orders: () => this.generateOrder(),
      companies: () => this.generateCompany(),
      events: () => this.generateEvent()
    };
    
    const generator = generators[tableName];
    if (!generator) {
      throw new Error(`No generator found for table: ${tableName}`);
    }
    
    return this.generateArray(generator, count);
  }
}