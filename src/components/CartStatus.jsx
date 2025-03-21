import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { useUser } from '../contexts/UserContext';
import { getCart } from '../api/firebase';

export default function CartStatus() {
  const { uid } = useUser();
  const { data: carts } = useQuery({
    queryKey: ['carts', uid],
    queryFn: async () => {
      const carts = await getCart(uid);
      return carts;
    },
    staleTime: 1000 * 60,
    enabled: !!uid, // uid가 있는 경우에만 해당 쿼리를 사용할 수 있도록 설정
  });

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
