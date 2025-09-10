import { test as base } from '@playwright/test';
import { assertText } from '../../../support/assertions';
import { PageManager } from '../page-objects/pageManager';
import { setupNewUser } from '../setup/newUser.setup';
import path from 'path';
import fs from 'fs';

type NewUser = Awaited<ReturnType<typeof setupNewUser>>;

// What this fixture provides:
// - newUser: details returned by setupNewUser (name/email/password, etc.)
// - loginAsNewUser(): reusable login action that logs in using the newly-created user's credentials
// - authStatePath: storageState captured immediately after registration (useful for spinning up a fresh context already logged-in)
export const test = base.extend<{
  newUser: NewUser & {
    loginAsNewUser: () => Promise<void>;
    authStatePath: string;
  };
}>({
  newUser: async ({ page, browser }, use, testInfo) => {
    // Arrange: create user (this flow auto-logs in at the end of registration)
    const user = await setupNewUser(page);

    // Immediately capture the signed-in storage state so it can be reused later
    const authDir = path.join(testInfo.outputDir, '.auth');
    const authStatePath = path.join(authDir, `newUser-${testInfo.workerIndex}.json`);
    if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
    await page.context().storageState({ path: authStatePath });

    // Reusable login action that uses the new user's credentials.
    // If the session is still valid (common right after creation), this is effectively a no-op except for a quick check.
    const loginAsNewUser = async (): Promise<void> => {
      const pm = new PageManager(page);

      // Fast-path: if we can see a signed-in UI element, just return.
      try {
        // Adjust this to your nav indicator method if different.
        // For example, if you expose `isLoggedIn()` or a `loggedInAs` label.
        if (await pm.onHome.nav.isLoggedIn?.()) {
          return;
        }
      } catch { /* fall through to UI login */ }

      // Otherwise, do a clean UI login using page objects
      await page.goto('/');
      // If your nav has an explicit logout when already logged in, best-effort click it to reset state
      try { await pm.onHome.nav.clickLogout?.(); } catch { /* ignore */ }

      await pm.onHome.nav.clickLoginSignup();
      await pm.onLoginSignUpPage.login(user.email, user.password);

      // Optional: verify a visible post-login cue (update selector/method as per your POM)
      try {
        assertText(pm.onAccountCreatedPage.loggedInUserLabel ?? pm.onHome.nav.loggedInAs, user.name, 'User appears logged in');
      } catch { /* non-fatal */ }

      // Refresh captured storage state for later reuse
      await page.context().storageState({ path: authStatePath });
    };

    const composite = Object.assign(user, { loginAsNewUser, authStatePath });
    await use(composite);

    // Finalizer: cleanup user (via UI here; swap to API if available)
    try {
      const pm = new PageManager(page);
      await pm.onHome.nav.clickDeleteAccount();
      assertText(pm.onAccountDeletedPage.accountDeletedText, 'Account Deleted!', 'Account Deleted! text is visible after cleanup');
    } catch (e) {
      console.warn('Cleanup failed:', e);
    }
  },
});

export const expect = test.expect;