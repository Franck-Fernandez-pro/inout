import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export function useGoogleAuth() {
  const { startSSOFlow } = useSSO();

  async function login() {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'inout' }),
        strategy: 'oauth_google',
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // 2FA
      }
    } catch (err) {
      console.error('Erreur OAuth', err);
    }
  }

  return { login };
}
