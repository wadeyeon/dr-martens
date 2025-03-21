import React from 'react';
import Banner from '../components/Banner';
import Products from './Products';

export default function Home() {
  return (
    <div>
      <Banner src='/images/banner.jpg' alt='banner' />
      <Products />
    </div>
  );
}
