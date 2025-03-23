import React, { useRef, useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/imageUploader';
import useProducts from '../hooks/useProduct';

export default function NewProduct() {
  const fileRef = useRef(null);
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const {
    addProduct: { mutate, isPending },
  } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      mutate(
        { product, url },
        {
          onSuccess: () => {
            alert('상품이 등록되었습니다.');
            setFile();
            setProduct({});
            if (fileRef.current) {
              fileRef.current.value = ''; // fileRef.current: file input DOM
            }
          },
        }
      );
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  return (
    <section className='mx-auto px-8 w-10/12'>
      <h2 className='my-4 mb-16 text-2xl font-bold'>새로운 상품 등록</h2>
      {file && (
        <img
          className='mx-auto mb-10 w-96'
          src={URL.createObjectURL(file)}
          alt={file.name}
        />
      )}
      <form className='flex flex-col gap-4 mb-10 px-10' onSubmit={handleSubmit}>
        <input
          type='file'
          ref={fileRef}
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='상품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='상품 설명'
          required
          onChange={handleChange}
        />
        <input
          className='mb-8'
          type='text'
          name='size'
          value={product.size ?? ''}
          placeholder='사이즈(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button
          text={isPending ? '업로드 중...' : '상품 등록하기'}
          onClick={handleSubmit}
          disabled={isPending}
        />
      </form>
    </section>
  );
}
