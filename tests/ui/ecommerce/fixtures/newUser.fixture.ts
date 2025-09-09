// tests/ui/ecommerce/fixtures/newUser.fixture.ts
import { test as base} from '@playwright/test';
import { setupNewUser } from '../setup/newUser.setup';
import { PageManager } from '../page-objects/pageManager';

import { assertVisible, assertEqual, assertText, logAssert } from '../../../support/assertions'

type NewUser = Awaited<ReturnType<typeof setupNewUser>>;

export const test = base.extend<{ newUser: NewUser }>({
  newUser: async ({ page }, use) => {
    // Arrange: create user
    const user = await setupNewUser(page);
    await use(user);

    // Finalizer: cleanup user (via UI here; swap to API if available)
    try {
      const pm = new PageManager(page);
      // ensure we’re on a page with the nav / delete link:
      await pm.onHome.nav.clickDeleteAccount();
      assertText(pm.onAccountDeletedPage.accountDeletedText, 'Account Deleted!', 'Account Deleted! text is visible after cleanup');

    } catch (e) {
      // don’t fail the whole suite on cleanup; just log
      console.warn('Cleanup failed:', e);
    }
  },
});
export const expect = test.expect;