import { BetterAuth } from 'better-auth';

export const auth = new BetterAuth({
  // You will need to get these values from your Better Auth dashboard
  clientId: 'YOUR_BETTER_AUTH_CLIENT_ID',
  clientSecret: 'YOUR_BETTER_AUTH_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/auth/callback',
});
