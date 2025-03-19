import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <img
      className='rounded-full w-10 h-10'
      src={photoURL}
      alt={displayName}
      referrerPolicy='no-referrer' // 리소스를 가져올 때 Referer header를 생략
    />
  );
}
