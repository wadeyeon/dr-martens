import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const {
    isPending,
    error,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5분
  });

  return (
    <>
      {isPending && <p>Loading...</p>}
      {error && (
        <p>데이터를 불러오는데 문제가 발생했습니다. 다시 시도해주세요.</p>
      )}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
      {isFetching && <p>Updating...</p>}
    </>
  );
}
