import { faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';

import { DEFAULT_SEED } from '../data/constants';
import { userBuilder as baseUserBuilder, addressBuilder as baseAddressBuilder, randomButtonLabel } from '../data/factories';

type TestData = {
  faker: typeof faker;
  userBuilder: ReturnType<typeof makeUserBuilder>;
  addressBuilder: ReturnType<typeof makeAddressBuilder>;
  randomButtonLabel: typeof randomButtonLabel;
};

function makeUserBuilder() {
  return (overrides?: Parameters<typeof baseUserBuilder>[1]) => baseUserBuilder(faker, overrides);
}

function makeAddressBuilder() {
  return (overrides?: Parameters<typeof baseAddressBuilder>[1]) => baseAddressBuilder(faker, overrides);
}

export const test = base.extend<TestData>({
  faker: async ({}, use) => {
    // Deterministic seed to make generated data stable across runs
    const seed = Number(process.env.FAKER_SEED ?? DEFAULT_SEED);
    faker.seed(seed);
    use(faker);
  },
  userBuilder: async ({}, use) => {
    use(makeUserBuilder());
  },
  addressBuilder: async ({}, use) => {
    use(makeAddressBuilder());
  },
  randomButtonLabel: async ({}, use) => {
    use(randomButtonLabel);
  },
});

export { expect } from '@playwright/test';
