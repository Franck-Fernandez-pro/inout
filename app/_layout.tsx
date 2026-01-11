import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL environment variable is not set');
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ConvexProvider>
  );
}
