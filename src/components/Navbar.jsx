import React, { useState } from 'react';
import { BsFillCartFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';
import { login, logout } from '../api/firebase';

export default function Navbar() {
  const [user, setUser] = useState();

  const handleLogIn = () => {
    login().then(setUser);
  };

  const handleLogOut = () => {
    logout().then(setUser);
  };

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
        {!user && <button onClick={handleLogIn}>LogIn</button>}
        {user && <button onClick={handleLogOut}>LogOut</button>}
      </nav>
    </header>
  );
}
