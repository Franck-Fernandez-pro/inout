import { Id } from '@/convex/_generated/dataModel';

export type JWT = {
  aud: 'convex';
  exp: number;
  iat: number;
  iss: 'https://tidy-puma-951.convex.site';
  sessionId: Id<'authSessions'>;
  sub: `${Id<'users'>}|${Id<'authSessions'>}`;
  userId: Id<'users'>;
};

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
  const jwt = JSON.parse(jsonPayload);
  jwt.userId = jwt.sub.split('|')[0];
  jwt.sessionId = jwt.sub.split('|')[1];

  return jwt as JWT;
}

export function parseJwtNodeJS(token: string | null) {
  if (!token) return;

  const base64Url = token.split('.')[1];
  const base64 = Buffer.from(base64Url, 'base64').toString();
  const jwt = JSON.parse(base64) as JWT;

  return jwt;
}
