import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';

export default function Photos({ match }) {
  const id = get(match, 'params.id', '');
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        errors.map((error) => toast.error(error));
      }
    };

    getData();
  }, [id]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.querySelector('input').files[0];
    if (file !== undefined) {
      const fotoURL = URL.createObjectURL(file);
      setFoto(fotoURL);

      const formData = new FormData();
      formData.append('aluno_id', id);
      formData.append('foto', file);

      try {
        await axios.post('/fotos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Foto adicionada com sucesso!!');
        history.push('/');
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        errors.map((error) => toast.error(error));
      }
    } else {
      toast.warning('Voce precisa selecionar uma foto!!');
    }
  };

  return (
    <Container>
      <Title>Fotos</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>

        <button type="submit">Enviar!!</button>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
