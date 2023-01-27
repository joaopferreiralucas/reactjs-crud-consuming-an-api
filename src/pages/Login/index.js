import React from 'react';
import { useDispatch } from 'react-redux';

import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch({
      type: 'BOTAO_CLICADO',
    });
  }

  return (
    <Container>
      <Title>
        Login
        <small>oie</small>
      </Title>
      <p>Lorem Ipsuimajdslkash</p>
      <button type="submit" onClick={handleClick}>Enviar</button>
    </Container>
  );
}
