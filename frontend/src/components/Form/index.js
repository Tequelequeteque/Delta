/* eslint-disable react/no-string-refs */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from '@unform/web';
import Input from '../Input';
import './style.css';

export default function FormPupil({ submitName, pageName, cb, data }) {
  return (
    <Form
      onSubmit={cb}
      initialData={
        data && {
          name: data.name,
          image: data.image.url,
          ...data.address,
        }
      }
    >
      <div className="split">
        <h1>{pageName}</h1>
      </div>
      <Input
        name="image"
        type="file"
        accept=".jpg"
        path="files[0]"
        fileName={data && data.image.path}
      />
      <div className="split" />
      <div className="split" />
      <Input name="name" label="Nome" type="text" />
      <div className="split">
        <h1>Endereço</h1>
      </div>
      <Input name="country" label="País" type="text" />
      <Input name="state" label="Estado" type="text" />
      <Input name="city" label="Cidade" type="text" />
      <Input name="street" label="Rua" type="text" />
      <Input name="number" label="Número" type="text" />
      <div className="split" />
      <button type="submit">{submitName || 'Submit'}</button>
    </Form>
  );
}
