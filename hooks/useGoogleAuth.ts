import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export function useGoogleAuth() {
  const { startSSOFlow } = useSSO();

  async function login() {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          redirectUrl: Linking.createURL('/', { scheme: 'inout' }),
          strategy: 'oauth_google',
        });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        return;
      } else {
        if (signIn || signUp) {
          // Route to verification UI / complete MFA or new user flow
          return;
        }
        throw new Error('SSO did not return a session or verification object');
      }
    } catch (err) {
      console.error('Erreur OAuth', err);
    }
  }

  return { login };
}
