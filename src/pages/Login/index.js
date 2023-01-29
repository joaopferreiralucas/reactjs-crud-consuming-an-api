import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('EMAIL INVALIDO');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.warning('Senha invalida');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({
      email,
      password,
      prevPath,
    }));
  };

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>

        <label htmlFor="email">
          Email:
          <input type="text" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" placeholder="Sua password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit">Entrar!</button>
      </Form>
    </Container>
  );
}
