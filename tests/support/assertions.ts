import { expect, Locator } from '@playwright/test';

// ANSI color helpers
const green = (msg: string) => `\x1b[32m${msg}\x1b[0m`;
const red = (msg: string) => `\x1b[31m${msg}\x1b[0m`;

function fmt(value: unknown): string {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }
  if (value === null || value === undefined) return String(value);
  return String(value);
}

async function withLogging(
  message: string,
  run: () => Promise<void> | void,
  onErrorDetail?: () => string | undefined
) {
  try {
    await run();
    console.log(green(`✅ Assertion passed: ${message}`));
  } catch (err: unknown) {
    console.error(red(`❌ Assertion FAILED: ${message}`));
    if (onErrorDetail) {
      const detail = onErrorDetail();
      if (detail) console.error(red(detail));
    }
    if (err instanceof Error && err.message) {
      console.error(red(err.message));
    } else {
      console.error(red(String(err)));
    }
    throw err;
  }
}

export async function assertVisible(locator: Locator, subject: string) {
  await withLogging(`'${subject}' is visible`, () => expect(locator, `'${subject}' should be visible`).toBeVisible());
}

export async function assertHidden(locator: Locator, subject: string) {
  await withLogging(`'${subject}' is not visible`, () => expect(locator, `'${subject}' should be hidden`).not.toBeVisible());
}

export async function assertText(locator: Locator, expected: string, subject?: string) {
  const label = subject ?? 'text';
  await withLogging(
    `${label} equals '${expected}'`,
    () => expect(locator, `${label} should equal '${expected}'`).toHaveText(expected)
    // Optional: we could fetch actual text on error, but that requires async; keeping it simple here.
  );
}

export async function assertEqual<T>(actual: T, expected: T, subject?: string) {
  const label = subject ?? 'values';
  await withLogging(
    `${label} match (${fmt(actual)} == ${fmt(expected)})`,
    () => expect(actual as unknown, `${label} should match`).toBe(expected as unknown),
    () => `Actual: ${fmt(actual)} | Expected: ${fmt(expected)}`
  );
}

export async function logAssert(message: string, assertion: () => Promise<void> | void) {
  await withLogging(message, assertion);
}
