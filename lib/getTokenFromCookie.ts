import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { JWT, parseJwtNodeJS } from './parseJwt';

export function getTokenFromCookie(
  nextCookies: ReadonlyRequestCookies,
): JWT | undefined {
  const jwtToken = nextCookies.get('__convexAuthJWT')?.value;
  if (!jwtToken) return undefined;

  return parseJwtNodeJS(jwtToken);
}
