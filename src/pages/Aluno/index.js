import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Os dados foram alterados com sucesso');
        history.push('/');
      } else {
        await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno criado!!');
        history.push('/');
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }

      if (status === 401) {
        dispatch(actions.loginFailure);
        toast.info('Ocorreu um erro faça login novamente!');
      }
    }
  };

  return (
    <Container>
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
        <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} placeholder="Sobrenome" />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Idade" />
        <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Peso" />
        <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Altura" />
        <button type="submit">Enviar!</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
