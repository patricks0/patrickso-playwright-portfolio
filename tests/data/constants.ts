// Static constants and enums shared across tests
export const DEFAULT_SEED = 12345;
export const TIMEOUTS = {
  short: 500,
  medium: 2000,
  long: 5000,
} as const;

export const ROLES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
} as const;

