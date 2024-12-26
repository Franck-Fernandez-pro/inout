'use client';

import { parseJwt } from '@/lib';
import { useAuthToken } from '@convex-dev/auth/react';

import { InputHTMLAttributes } from 'react';

export function UserIdInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const token = useAuthToken();
  const userId = parseJwt(token);

  return (
    <input
      type="hidden"
      name="userId"
      defaultValue={userId?.userId}
      {...props}
    />
  );
}
