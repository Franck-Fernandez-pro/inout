import { type ReactNode } from 'react';
import { TamaguiProvider as TamaguiProviderBase, YStack } from 'tamagui';
import { config } from '@/tamagui.config';

const APP_BACKGROUND = '#f4f2eb';

export const TamaguiProvider = ({ children }: { children: ReactNode }) => (
  <TamaguiProviderBase config={config} defaultTheme="light">
    <YStack flex={1} backgroundColor={APP_BACKGROUND}>
      {children}
    </YStack>
  </TamaguiProviderBase>
);
