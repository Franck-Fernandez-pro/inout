import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Slot } from 'expo-router';
import { TamaguiProvider } from '@/components/Tamagui.provider';

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL environment variable is not set');
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <TamaguiProvider>
        <Slot />
      </TamaguiProvider>
    </ConvexProvider>
  );
}
