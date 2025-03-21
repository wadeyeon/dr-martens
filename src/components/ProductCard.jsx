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
      className='rounded-lg overflow-hidden shadow-md cursor-pointer'
      onClick={handleClick}
    >
      <img className='w-full' src={image} alt={title} />
      <div className='p-2'>
        <h3>{title}</h3>
        <p className='text-sm text-gray-500'>
          &#8361; {price.toLocaleString()}
        </p>
      </div>
    </li>
  );
}
