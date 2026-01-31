import { type ComponentProps } from 'react';
import { Button as NativeButton } from 'react-native';

export const Button = (props: ComponentProps<typeof NativeButton>) => (
  <NativeButton {...props}></NativeButton>
);
