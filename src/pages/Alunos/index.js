import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle, FaEdit, FaWindowClose, FaExclamationCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePhoto, NovoAluno } from './styled';
import axios from '../../services/axios';
import { warningColor } from '../../config/colors';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  React.useEffect(() => {
    async function getData() {
      const res = await axios.get('/alunos');

      setAlunos(res.data);
    }

    getData();
  }, []);

  const handleAskDelete = (e) => {
    e.preventDefault();

    const exclamation = e.currentTarget.nextSibling;

    e.currentTarget.remove();
    exclamation.setAttribute('display', 'block');
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      await axios.delete(`/alunos/${id}`);

      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Voce precisa estar logado!!!');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
    }
  };

  return (
    <Container>
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePhoto>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePhoto>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}><FaEdit size={16} /></Link>
            <Link to={`/aluno/${aluno.id}`} onClick={handleAskDelete}><FaWindowClose size={16} /></Link>
            <FaExclamationCircle color={warningColor} size={16} display="none" cursor="pointer" onClick={(e) => handleDelete(e, aluno.id, index)} />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
