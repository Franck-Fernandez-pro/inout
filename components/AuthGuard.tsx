import { useAuth } from '@clerk/clerk-expo';
import { useSegments, useRouter, Slot } from 'expo-router';
import { useEffect } from 'react';

export function AuthGuard() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // Connecté -> On sort de la zone (auth) pour aller vers (tabs)
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      // Pas connecté -> On éjecte vers le login
      router.replace('/(auth)/login');
    }
  }, [isSignedIn, segments, isLoaded, router]);

  return <Slot />;
}
