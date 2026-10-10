/**
 * Input sanitization helpers to prevent XSS and strip unsafe characters
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // remove direct angle brackets
    .slice(0, 5000); // prevent oversized payloads
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return true; // optional
  const phoneRegex = /^[\d\s+\-().]{6,30}$/;
  return phoneRegex.test(phone.trim());
}
