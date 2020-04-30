export const AUTH_CONFIG = {
  domain: 'dev-3fdu5-wi.au.auth0.com',
  clientId: 'nkqOlJpNLYNR7kcYh5eZuQa5tclPg94p',
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://stillproud.com/callback',
}
