import React from 'react';
import { useNavigate } from 'react-router';

export default function ProductCard({
  product,
  product: { image, title, price },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <li
      className='p-2 border border-white overflow-hidden cursor-pointer transition-all hover:border-gray-300'
      onClick={handleClick}
    >
      <img className='w-full' src={image} alt={title} />
      <div className='p-2'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500'>{price.toLocaleString()}원</p>
      </div>
    </li>
  );
}
