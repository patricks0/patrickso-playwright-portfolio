import { faker as baseFaker } from '@faker-js/faker';

export type UserPayload = { name: string; job: string };

export function userPayloadBuilder(faker = baseFaker, overrides: Partial<UserPayload> = {}): UserPayload {
  return {
    name: faker.person.firstName(),
    job: faker.person.jobTitle(),
    ...overrides,
  };
}

