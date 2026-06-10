/**
 * Get the value of a cookie by name
 * @param {string} name - The cookie name
 * @returns {string|null} - The cookie value or null if not found
 */
export const getCookieValue = (name: string) => {
  if (typeof name !== "string" || !name.trim()) {
      console.error("Invalid cookie name.");
      return null;
  }

  // Create a regex to match the cookie name and capture its value
  const match = document.cookie.match(
      new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)')
  );

  // Decode the value if found
  return match ? decodeURIComponent(match[1]) : null;
}