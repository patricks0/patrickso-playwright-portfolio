import { test as base } from './fixtures';
import { faker } from '@faker-js/faker';
import { userPayloadBuilder } from './data/factories';

type ApiDataFixtures = {
  faker: typeof faker;
  userPayload: (overrides?: Parameters<typeof userPayloadBuilder>[1]) => ReturnType<typeof userPayloadBuilder>;
};

export const test = base.extend<ApiDataFixtures>({
  faker: async ({}, use) => {
    const seed = Number(process.env.FAKER_SEED ?? 12345);
    faker.seed(seed);
    use(faker);
  },
  userPayload: async ({}, use) => {
    use((overrides = {}) => userPayloadBuilder(faker, overrides));
  },
});

export { expect } from '@playwright/test';

