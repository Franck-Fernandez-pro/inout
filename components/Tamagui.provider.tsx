import { createTamagui, TamaguiProvider as TamaguiProviderBase } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v5';

// you usually export this from a tamagui.config.ts file
const config = createTamagui(defaultConfig);

type Conf = typeof config;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export const TamaguiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TamaguiProviderBase config={config} defaultTheme="light">
    {children}
  </TamaguiProviderBase>
);
