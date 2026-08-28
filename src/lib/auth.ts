export const DEMO_COOKIE_NAME = "jb_demo_session";
export const DEFAULT_DEMO_PASSWORD = "boos2026";

export function getExpectedPassword(): string {
  return process.env.DEMO_PASSWORD || DEFAULT_DEMO_PASSWORD;
}

export function isValidPassword(candidate: string): boolean {
  if (!candidate) return false;
  const expected = getExpectedPassword();
  return candidate.trim() === expected.trim();
}

export function generateSessionToken(): string {
  // Simple deterministic auth token for demo gate
  const secret = process.env.SESSION_SECRET || "boos-concept-demo-token-2026";
  return Buffer.from(`authenticated:${secret}`).toString("base64");
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const expected = generateSessionToken();
    return token === expected;
  } catch {
    return false;
  }
}
