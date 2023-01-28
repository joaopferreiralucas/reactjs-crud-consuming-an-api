import { toast } from 'react-toastify';

import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      toast.success('Sucesso no botao clicado');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      toast.info('Fazendo sua req');
      return state;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      toast.error('Deu error ein');
      return state;
    }

    default:
      return state;
  }
}
