import { type ReactNode } from 'react';
import { TamaguiProvider as TamaguiProviderBase } from 'tamagui';
import { config } from '@/tamagui.config';

export const TamaguiProvider = ({ children }: { children: ReactNode }) => (
  <TamaguiProviderBase config={config} defaultTheme="light">
    {children}
  </TamaguiProviderBase>
);
