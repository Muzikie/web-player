import { createCookieSessionStorage } from '@remix-run/node';

const options = {
  name: '@session',
  // domain: 'localhost:3000',
  // httpOnly: true,
  // maxAge: 60,
  // path: '/',
  // sameSite: 'lax',
  // secrets: ['s3cret1'],
  // secure: true,
};

const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: options,
});

export { getSession, commitSession, destroySession };
