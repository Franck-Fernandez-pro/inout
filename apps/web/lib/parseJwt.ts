import { Id } from '@repo/convex';

export type JWT = {
  aud: 'convex';
  exp: number;
  iat: number;
  iss: 'https://tidy-puma-951.convex.site';
  sessionId: Id<'authSessions'>;
  sub: `${Id<'users'>}|${Id<'authSessions'>}`;
  userId: Id<'users'>;
};

function enrichJwt(jwt: JWT) {
  jwt.userId = jwt.sub.split('|')[0] as Id<'users'>;
  jwt.sessionId = jwt.sub.split('|')[1] as Id<'authSessions'>;

  return jwt;
}

export function parseJwt(token: string | null) {
  if (!token) return;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  const rawJwt = JSON.parse(jsonPayload);
  const jwt = enrichJwt(rawJwt);

  return jwt;
}

export function parseJwtNodeJS(token: string | null) {
  if (!token) return;

  const base64Url = token.split('.')[1];
  const base64 = Buffer.from(base64Url, 'base64').toString();
  const rawJwt = JSON.parse(base64);
  const jwt = enrichJwt(rawJwt);

  return jwt;
}
