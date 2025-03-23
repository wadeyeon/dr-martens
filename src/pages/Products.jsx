import React from 'react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProduct';

export default function Products() {
  const {
    productsQuery: { isPending, error, data: products, isFetching },
  } = useProducts();

  return (
    <>
      {isPending && <p>Loading...</p>}
      {error && (
        <p>데이터를 불러오는데 문제가 발생했습니다. 다시 시도해주세요.</p>
      )}
      <section className='mt-4'>
        <h2 className='my-4 ml-8 text-2xl font-bold'>상품 전체보기</h2>
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-10 p-4'>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ul>
      </section>
      {isFetching && <p>Updating...</p>}
    </>
  );
}
