/**
 * Converts the input string to a URL-friendly format.
 *
 * The function performs the following operations in order:
 * 1. Converts all characters in the input string to lowercase.
 * 2. Removes all non-word characters (anything except alphanumeric and underscores),
 *    whitespace, and hyphens.
 * 3. Trims leading and trailing spaces from the string.
 * 4. Replaces one or more spaces with a single hyphen.
 * 5. Replaces multiple consecutive hyphens with a single hyphen.
 *
 */
export default (input: string) => input?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
  .replace(/-+/g, '-');
