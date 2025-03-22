import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import useCarts from '../hooks/useCarts';

export default function CartStatus() {
  const {
    cartsQuery: { data: carts },
  } = useCarts();

  return (
    <div className='relative'>
      <BsFillCartFill className='text-2xl' />
      {carts && carts.length > 0 && (
        <p className='absolute -right-2 -top-2 w-5 h-5 rounded-full bg-brand text-center text-sm'>
          {carts.length}
        </p>
      )}
    </div>
  );
}
