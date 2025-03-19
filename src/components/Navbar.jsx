import React, { useEffect, useState } from 'react';
import { BsFillCartFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/Button';

export default function Navbar() {
  const [user, setUser] = useState();

  // 새로고침시 user 정보가 초기화되는 문제 처리
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

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
        {user && <User user={user} />}
        {!user && <Button text='LogIn' onClick={login} />}
        {user && <Button text='LogOut' onClick={logout} />}
      </nav>
    </header>
  );
}
