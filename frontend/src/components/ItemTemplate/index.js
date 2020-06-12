/* eslint-disable react/prop-types */
import React from 'react';
import './style.css';
import { Button } from 'primereact/button';

export default function itemTemplate({ pupil, icon, cb }) {
  return (
    <div className="row">
      <img
        className="photo"
        src={pupil.image.url}
        alt={pupil.image.fileName || 'profile.jpg'}
        width="150"
      />
      <div className="column">
        <div>
          Estudante: <b>{pupil.name}</b>
        </div>
        <div>
          País: <b>{pupil.address.country}</b>
        </div>
        <div>
          Estado: <b>{pupil.address.state}</b>
        </div>
        <div>
          Cidade: <b>{pupil.address.city}</b>
        </div>
        <div>
          Rua: <b>{pupil.address.street}</b>
        </div>
        <div>
          Número: <b>{pupil.address.number}</b>
        </div>
      </div>
      <div className="containerButton">
        <Button icon={icon} onClick={() => cb(pupil.id)} />
      </div>
    </div>
  );
}
