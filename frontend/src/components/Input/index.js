/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useField } from '@unform/core';

export default function Input({ name, label, path, fileName, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const [defaultImage] = useState('http://localhost:3333/files/profile.jpg');
  const [src, setSrc] = useState(defaultImage);

  function handleAddImage({ target: { files } }) {
    const file = files[0];
    if (!file || file.type !== 'image/jpeg') return;
    const reader = new FileReader();

    reader.onloadend = ({ target: { result } }) => setSrc(result);
    reader.readAsDataURL(file);
  }

  async function setImage() {
    const urlImage = inputRef.current.getAttribute('value');
    const res = await fetch(urlImage);
    const blob = await res.blob();
    const file = new File([blob], fileName || 'profile.jpg');
    setSrc(urlImage);
    handleAddImage({ target: { files: { '0': file } } });
  }

  function handleRemoveImage() {
    if (inputRef.current) {
      inputRef.current.setAttribute('value', defaultImage);
      setImage();
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: path || 'value',
    });
    if (rest.type === 'file' && defaultValue) setImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, inputRef, registerField, defaultValue]);

  return (
    <div className="item">
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        onChange={rest.type === 'file' ? e => handleAddImage(e) : null}
        hidden={rest.type === 'file'}
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />
      {rest.type === 'file' && (
        <>
          <img
            src={src}
            alt={src}
            width="300px"
            height="300px"
            onClick={() => inputRef.current.click()}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={() => inputRef.current.click()}>
              Adicionar foto
            </button>
            <button type="button" onClick={() => handleRemoveImage()}>
              Remover foto
            </button>
          </div>
        </>
      )}

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </div>
  );
}
