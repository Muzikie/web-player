import { createCookieSessionStorage } from '@remix-run/node';

const cookie = {
  name: '@session',
  // domain: 'localhost:3000',
  // httpOnly: true,
  // maxAge: 60,
  // path: '/',
  // sameSite: 'lax',
  // secrets: ['s3cret1'],
  // secure: true,
};

const cookieStorage = createCookieSessionStorage({ cookie });

export const getSession = cookieStorage.getSession;
export const commitSession = cookieStorage.commitSession;
export const destroySession = cookieStorage.destroySession;
