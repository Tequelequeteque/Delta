/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <Li label="Criar aluno" to="/create" />
        <Li label="Listar alunos" to="/index" />
        <Li label="Deletar aluno" to="/delete" />
        <Li label="Sobre" to="/about" />
      </ul>
    </nav>
  );
}

function Li({ label, to, activeOnlyWhenExact }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  const navigate = useHistory();

  return (
    <li onClick={() => navigate.push(to)} className={match ? 'active' : ''}>
      {label}
    </li>
  );
}
