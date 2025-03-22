import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useCarts from '../hooks/useCarts';

const ICON_CLASS =
  'cursor-pointer transition-all hover:text-brand hover:scale-105';

export default function CartItem({
  product,
  product: { id, title, image, price, size, quantity },
}) {
  const { addOrUpdateItem, removeItem } = useCarts();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };

  const handleDelete = () => removeItem.mutate({ id });

  return (
    <li className='flex justify-between items-center py-2'>
      <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='font-bold'>{size}</p>
          <p>&#8361; {price.toLocaleString()}</p>
        </div>
        <div className='flex items-center gap-2 text-xl'>
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
