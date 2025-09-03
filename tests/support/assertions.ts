import { expect, Locator } from '@playwright/test';

export async function assertVisible(locator: Locator, subject: string) {
  await expect(locator).toBeVisible();
  console.log(`✅ Assertion passed: '${subject}' is visible`);
}

export async function assertHidden(locator: Locator, subject: string) {
  await expect(locator).not.toBeVisible();
  console.log(`✅ Assertion passed: '${subject}' is not visible`);
}

export async function assertText(locator: Locator, expected: string, subject?: string) {
  await expect(locator).toHaveText(expected);
  console.log(`✅ Assertion passed: ${subject ?? 'text'} equals '${expected}'`);
}

export async function assertEqual<T>(actual: T, expected: T, subject?: string) {
  expect(actual).toBe(expected);
  console.log(`✅ Assertion passed: ${subject ?? 'values'} match (${String(actual)} == ${String(expected)})`);
}

export async function logAssert(message: string, assertion: () => Promise<void> | void) {
  await assertion();
  console.log(`✅ Assertion passed: ${message}`);
}

