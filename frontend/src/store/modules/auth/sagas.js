import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess } from './actions';

export function* signIn({ payload: { email, password } }) {
  const res = yield call(api.post, '/sessions', { email, password });

  const { token, user } = res.data;

  if (!user.provider) {
    console.tron.error('Usuário não é prestador');
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
