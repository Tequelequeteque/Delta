import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import FormPupil from '../../components/Form';
import API from '../../services/api';

export default function Create() {
  const navigate = useHistory();
  async function handleCreate({
    image,
    name,
    country,
    state,
    city,
    street,
    number,
  }) {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('name', name);
    fd.append('country', country);
    fd.append('state', state);
    fd.append('city', city);
    fd.append('street', street);
    fd.append('number', number);
    try {
      await API.post('/pupils', fd);
      toast.success(
        'Aluno criado com sucesso!\n Você será redirecionado para lista de alunos!',
        {
          onClose: () => navigate.push('index'),
        }
      );
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <FormPupil
      submitName="Criar Aluno"
      pageName="Cadastro de aluno"
      cb={handleCreate}
    />
  );
}
