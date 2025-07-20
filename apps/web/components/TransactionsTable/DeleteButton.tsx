'use client';

import { removeTransaction } from '@/actions/removeTransaction';
import { Trash } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

export default function DeleteButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    if (!id) return;

    removeTransaction(id);
  }

  return (
    <button onClick={onClick} {...props}>
      <Trash color="red" size={16} />
    </button>
  );
}
