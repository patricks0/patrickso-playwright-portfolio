import { faker as baseFaker } from '@faker-js/faker';

// Builders return fresh objects and allow overrides for targeted scenarios
export function userBuilder(faker = baseFaker, overrides: Partial<{ name: string; email: string }> = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    ...overrides,
  };
}

export function addressBuilder(
  faker = baseFaker,
  overrides: Partial<{ line1: string; city: string; postcode: string }> = {}
) {
  return {
    line1: faker.location.streetAddress(),
    city: faker.location.city(),
    postcode: faker.location.zipCode(),
    ...overrides,
  };
}

export function randomButtonLabel(faker = baseFaker, words = 2) {
  return faker.word.words(words);
}

