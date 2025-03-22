import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import useCarts from '../hooks/useCarts';

const DELIVERY_FEE = 3000;

export default function MyCart() {
  const {
    cartsQuery: { isPending, error, data: carts },
  } = useCarts();

  const hasCarts = carts && carts.length > 0;
  const totalPrice =
    hasCarts && carts.reduce((a, b) => a + parseInt(b.price) * b.quantity, 0);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section>
      <p>내 장바구니</p>
      {!hasCarts && <p>장바구니가 비어있습니다.</p>}
      {hasCarts && (
        <>
          <ul>
            {carts.map((cart) => (
              <CartItem key={cart.id} product={cart} />
            ))}
          </ul>
          <div className='flex justify-between items-center mb-4'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배달비' price={DELIVERY_FEE} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총 가격' price={totalPrice + DELIVERY_FEE} />
          </div>
        </>
      )}
    </section>
  );
}
