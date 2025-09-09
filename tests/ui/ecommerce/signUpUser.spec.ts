import { test} from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText} from '../../support/assertions';

test('Verify that user can be registered and be deleted', async ({ page, newUser }) => {
  const pm = new PageManager(page);
  await assertText(pm.onHome.actualUserLoggedIn, `Logged in as ${newUser.username}`, 'Logged in as username is visible');
});