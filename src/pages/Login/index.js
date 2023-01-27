import React from 'react';

import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function Login() {
  React.useEffect(() => {
    async function getData() {
      const res = await axios.get('/alunos');
      const { data } = res;
      // eslint-disable-next-line no-console
      console.log(data);
    }

    getData();
  }, []);

  return (
    <Container>
      <Title>
        Login
        <small>oie</small>
      </Title>
      <p>Lorem Ipsuimajdslkash</p>
      <button type="submit">Enviar</button>
    </Container>
  );
}
