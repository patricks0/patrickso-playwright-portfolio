import { test } from '@playwright/test';
import { NavigationPage } from './page-objects/navigationPage';
import { AjaxPage } from './page-objects/ajaxPage';

test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
  const nav = new NavigationPage(page);
  const ajax = new AjaxPage(page);

  await nav.gotoAjax();                 // centralized navigation
  await ajax.triggerAjaxRequest();      // page-specific action
  await ajax.waitForAjaxResponseOk();   // network-level confirmation
  await ajax.expectDataLoadedVisible(); // UI confirmation
});