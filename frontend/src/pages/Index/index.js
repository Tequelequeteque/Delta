/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataView } from 'primereact/dataview';
import ItemTemplate from '../../components/ItemTemplate';
import API from '../../services/api';

export default function() {
  const navigate = useHistory();
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('/pupils');
        setPupils(data);
      } catch (error) {
        toast.error(error);
      }
    })();
  }, []);

  function handleNavigateUpdate(id) {
    navigate.push(`/update/${id}`);
  }

  return (
    <div className="container">
      <DataView
        value={pupils}
        layout="list"
        itemTemplate={pupil =>
          ItemTemplate({
            pupil,
            icon: 'pi pi-pencil',
            cb: handleNavigateUpdate,
          })
        }
      />
    </div>
  );
}
