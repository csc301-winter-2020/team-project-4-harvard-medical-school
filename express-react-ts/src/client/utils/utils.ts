const dateFormat = require("dateformat");
const dateStringFull = "mmmm d, yyyy";
const dateStringCompact = "m/d/yyyy";

/**
 * Formats the date to a string like this: "12/31/2018"
 * @param date The date as an int (in milliseconds)
 */
export function dateFormatCompact(date: number): string {
  return dateFormat(new Date(date), dateStringCompact);
}

/**
 * Formats the date to a string like this: "January 6, 1970"
 * @param date The date as an int (in milliseconds)
 */
export function dateFormatFull(date: number): string {
  return dateFormat(new Date(date), dateStringFull);
}

/**
 * Return the max of two numbers.
 * @param a The first number
 * @param b The second number
 */
export function max(a: number, b: number): number {
  if (a < b) {
    return b;
  }
  return a;
}

/**
 * Get the current time in milliseconds.
 */
export function now(): number {
  return new Date().getTime();
}
