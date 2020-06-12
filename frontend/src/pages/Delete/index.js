import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataView } from 'primereact/dataview';
import ItemTemplate from '../../components/ItemTemplate';
import API from '../../services/api';

export default function() {
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
  }, [pupils]);

  async function handleDelete(id) {
    try {
      await API.delete(`pupils/${id}`);
      toast.success('Aluno deletado com sucesso!');
      setPupils(pupils.filter(pupil => pupil.id !== id));
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="container">
      <DataView
        value={pupils}
        layout="list"
        itemTemplate={pupil =>
          ItemTemplate({ pupil, icon: 'pi pi-trash', cb: handleDelete })
        }
      />
    </div>
  );
}
