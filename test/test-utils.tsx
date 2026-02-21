import { render, type RenderOptions } from '@testing-library/react-native';
import React from 'react';
import { TamaguiProvider } from '@/components/Tamagui.provider';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider>{children}</TamaguiProvider>;
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
