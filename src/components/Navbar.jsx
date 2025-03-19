import React from 'react';
import { BsFillCartFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';
import User from './User';
import Button from './ui/Button';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const { user, login, logout } = useUser();

  return (
    <header className='flex justify-between items-center p-8 border-b'>
      <Link to='/'>
        <img className='w-32' src='/images/logo.svg' alt='logo' />
      </Link>
      <nav className='flex items-center gap-4'>
        <Link to='/products'>Products</Link>
        {user && user.isAdmin && (
          <Link to='/products'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && (
          <Link to='/carts'>
            <BsFillCartFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text='LogIn' onClick={login} />}
        {user && <Button text='LogOut' onClick={logout} />}
      </nav>
    </header>
  );
}
