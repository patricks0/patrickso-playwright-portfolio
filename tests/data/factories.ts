import { faker as baseFaker } from '@faker-js/faker';

const statesByCountry: Record<string, string[]> = {
  Australia: ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
  'United States': [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
  ],
};

// Builders return fresh objects and allow overrides for targeted scenarios
export function userBuilder(
  faker = baseFaker,
  overrides: Partial<{ name: string; username: string; email: string }> = {}
) {
  // Generate name without prefixes/titles
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = overrides.name ?? `${firstName} ${lastName}`;

  // Turn "Patrick Ryan So" into "patrickryanso"
  const username = overrides.username ?? name.replace(/\s+/g, '').toLowerCase();

  // Pick a random email provider
  const providers = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const provider = faker.helpers.arrayElement(providers);

  const email = overrides.email ?? `${username}@${provider}`;

  return {
    name,
    username,
    email,
    firstName,
    lastName,
    ...overrides,
  };
}

export function addressBuilder(
  country: string,
  overrides: Partial<{ line1: string; city: string; state: string; postcode: string; country: string }> = {}
) {
  const faker = baseFaker;
  const line1 = overrides.line1 ?? faker.location.streetAddress();
  const city = overrides.city ?? faker.location.city();
  const states = statesByCountry[country] ?? [];
  const state = overrides.state ?? (states.length > 0 ? faker.helpers.arrayElement(states) : '');
  let postcode: string;
  if (overrides.postcode !== undefined) {
    postcode = overrides.postcode;
  } else if (country === 'Australia') {
    postcode = String(faker.number.int({ min: 1000, max: 9999 }));
  } else if (country === 'United States') {
    postcode = String(faker.number.int({ min: 10000, max: 99999 }));
  } else {
    postcode = faker.location.zipCode();
  }
  return {
    line1,
    city,
    state,
    postcode,
    country,
    ...overrides,
  };
}

export function randomButtonLabel(faker = baseFaker, words = 2) {
  return faker.word.words(words);
}

export function companyBuilder(
  faker = baseFaker,
  overrides: Partial<{ name: string }> = {}
) {
  return {
    name: overrides.name ?? faker.company.name(),
    ...overrides,
  };
}


export function countryBuilder(
  overrides: Partial<{ name: string }> = {}
) {
  const countries = ['India', 'United States', 'Australia', 'Israel', 'New Zealand', 'Canada','Singapore'];
  return {
    name: overrides.name ?? baseFaker.helpers.arrayElement(countries),
    ...overrides,
  };
}

// Mobile number builder for different countries
export function mobileNumberBuilder(country: string): string {
  if (country === 'Australia') {
    // +61 4## ### ###
    const secondDigit = baseFaker.number.int({ min: 0, max: 9 });
    const thirdDigit = baseFaker.number.int({ min: 0, max: 9 });
    const block1 = baseFaker.number.int({ min: 100, max: 999 });
    const block2 = baseFaker.number.int({ min: 100, max: 999 });
    return `+61 4${secondDigit}${thirdDigit} ${block1} ${block2}`;
  } else if (country === 'United States') {
    // +1 (###) ###-####
    const area = baseFaker.number.int({ min: 200, max: 999 }); // avoid area codes starting with 0 or 1
    const prefix = baseFaker.number.int({ min: 200, max: 999 });
    const line = baseFaker.number.int({ min: 1000, max: 9999 });
    return `+1 (${area}) ${prefix}-${line}`;
  } else {
    return baseFaker.phone.number();
  }
}


// --- Date of Birth helpers ---
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random DOB where the user is at least `minAge` years old.
 * - Month name is a full English label (e.g., "January") to match common dropdowns.
 * - Day respects the number of days in the chosen month/year (incl. leap years).
 * @param minAge Minimum age (inclusive). Defaults to 18.
 * @param maxExtraYears Additional range above the minimum age to randomize (e.g., 60 ➜ up to 78yo).
 */
export function generateRandomDOB(minAge: number = 18, maxExtraYears: number = 60) {
  const now = new Date();
  const latestYear = now.getFullYear() - minAge; // youngest allowed
  const earliestYear = latestYear - maxExtraYears; // cap how old we pick
  const year = randomInt(earliestYear, latestYear);
  const month = randomInt(1, 12); // 1-12
  const daysInMonth = new Date(year, month, 0).getDate(); // last day of that month
  const day = randomInt(1, daysInMonth);

  const monthName = new Date(year, month - 1, 1).toLocaleString('en-US', {
    month: 'long',
  });

  return {
    day: String(day),
    month: String(month),
    monthName,
    year: String(year),
  } as const;
}
