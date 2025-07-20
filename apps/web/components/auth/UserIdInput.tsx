import { getTokenFromCookie } from '@/lib';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { InputHTMLAttributes } from 'react';

export async function UserIdInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  const cookieStore = await cookies();
  const jwt = getTokenFromCookie(cookieStore);
  if (!jwt) return redirect('/');

  const userId = jwt.userId;

  return <input type="hidden" name="userId" defaultValue={userId} {...props} />;
}
