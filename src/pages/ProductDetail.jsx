import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useLocation } from 'react-router';
import { useUser } from '../contexts/UserContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  const {
    state: {
      product: { id, title, image, price, description, category, size },
    },
  } = useLocation();
  const { uid } = useUser();
  const [selected, setSelected] = useState(size && size[0]);

  const handleAddCart = () => {
    const addedProduct = {
      id,
      title,
      image,
      price,
      size: selected,
      quantity: 1,
    };
    addOrUpdateToCart(uid, addedProduct);
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
          <Button text='장바구니 추가' onClick={handleAddCart} />
        </div>
      </section>
    </>
  );
}
