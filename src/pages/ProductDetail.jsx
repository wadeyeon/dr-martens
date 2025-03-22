import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import { addOrUpdateToCart } from '../api/firebase';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const {
    state: {
      product: { id, title, image, price, description, category, size },
    },
  } = useLocation();
  const { uid } = useUser();
  const [selected, setSelected] = useState(size && size[0]);
  const [success, setSuccess] = useState();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (addedProduct) => addOrUpdateToCart(uid, addedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  const handleAddCart = () => {
    const addedProduct = {
      id,
      title,
      image,
      price,
      size: selected,
      quantity: 1,
    };
    mutate(addedProduct, {
      onSuccess: () => {
        setSuccess('장바구니에 추가했습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      },
    });
  };

  return (
    <>
      <p className='mt-4 mx-12 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img
          className='basis-5/12 px-4 w-full max-w-xl'
          src={image}
          alt={title}
        />
        <div className='basis-7/12 flex flex-col w-full p-4'>
          <h2 className='text-3xl font-bold'>{title}</h2>
          <p className='py-2 text-gray-500'>{description}</p>
          <p className='pb-2'>&#8361; {price.toLocaleString()}</p>
          <select
            className='my-2 py-2 outline-none border'
            onChange={(e) => setSelected(e.target.value)}
          >
            {size &&
              size.map((value, index) => <option key={index}>{value}</option>)}
          </select>
          <Button
            text='장바구니 추가'
            onClick={handleAddCart}
            disabled={isPending}
          />
          {success && <p className='my-2'>✅ {success}</p>}
        </div>
      </section>
    </>
  );
}
