import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer({
    key: 'REACT BASE APP',
    storage,
    whitelist: ['example'],
  }, reducers);

  return persistedReducers;
};
