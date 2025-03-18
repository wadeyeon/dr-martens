import React from 'react';
import { BsFillCartFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <header className='flex justify-between items-center p-8 border-b'>
      <Link to='/'>
        <img className='w-32' src='/images/logo.svg' alt='logo' />
      </Link>
      <nav className='flex items-center gap-4'>
        <Link to='/products'>Products</Link>
        <Link to='/products'>
          <BsFillPencilFill />
        </Link>
        <Link to='/carts'>
          <BsFillCartFill />
        </Link>
        <button>LogIn</button>
      </nav>
    </header>
  );
}
