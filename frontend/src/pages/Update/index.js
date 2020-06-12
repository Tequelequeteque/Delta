import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormPupil from '../../components/Form';
import API from '../../services/api';

export default function Update() {
  const navigate = useHistory();
  const { id } = useParams();
  const [pupil, setPupil] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/pupils/${id}`);
        setPupil(data);
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [id]);

  async function handleUpdate({
    image,
    name,
    country,
    state,
    city,
    street,
    number,
  }) {
    const fd = new FormData();
    fd.append('id', id);
    fd.append('image', image || null);
    fd.append('name', name);
    fd.append('country', country);
    fd.append('state', state);
    fd.append('city', city);
    fd.append('street', street);
    fd.append('number', number);
    try {
      await API.put('/pupils', fd);
      toast.success(
        'Aluno atualizado com sucesso!\n Você será redirecionado para lista de alunos!',
        {
          onClose: () => navigate.push('/index'),
        }
      );
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <FormPupil
      submitName="Atualizar Aluno"
      pageName="Atualizar"
      cb={handleUpdate}
      data={pupil}
    />
  );
}
