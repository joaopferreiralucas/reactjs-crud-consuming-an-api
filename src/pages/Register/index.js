import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.warning('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('EMAIL INVALIDO');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.warning('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    try {
      await axios.post('/users', {
        nome,
        password,
        email,
      });

      toast.success('Conta criada com sucesso!!');

      history.push('/login');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', 0);

      errors.map((error) => toast.error(`ERRO: ${status} - ${error}!!`));
    }
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>

        <label htmlFor="email">
          Email:
          <input type="text" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" placeholder="Sua password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
