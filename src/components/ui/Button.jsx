import React from 'react';

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      className='bg-brand py-3 px-4 rounded-sm hover:bg-black hover:text-white'
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
