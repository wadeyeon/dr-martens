import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<NotFound />} />

      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='products/new' element={<NewProduct />} />
        <Route path='products/:productId' element={<ProductDetail />} />
        <Route path='carts' element={<MyCart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
