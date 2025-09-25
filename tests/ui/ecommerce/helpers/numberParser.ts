/**
 * Extract a numeric value from a currency/price string.
 * Handles formats like "Rs. 400", "$1,200.50", "₹ 1 200,50", "EUR 0.40", etc.
 */
export function parseCurrency(s: string): number {
  if (!s) return NaN;
  const match = s.match(/(\d{1,3}(?:[,\s]\d{3})+|\d+)([.,]\d+)?/);
  if (!match) return NaN;
  const integerPart = match[1].replace(/[,\s]/g, '');
  const decimalPart = match[2] ? match[2].replace(',', '.') : '';
  return parseFloat(integerPart + decimalPart);
}