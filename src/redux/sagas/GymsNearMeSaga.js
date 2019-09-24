import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* GymsNearMeSaga() {
  //yield takeEvery('GOOGLE_SEARCH', getSearch)
  yield takeEvery('POST_GOOGLE', postGoogle)
}

function* getSearch() {
  try {
    const response = yield axios.get('/search');

    yield put({ type: 'SET_SEARCH', payload: response.data.results })
    console.log('response', response.data.results)
  }
  catch (error) {
    console.log('error', error);


  }
}

function* postGoogle(action) {

  try {
    const response = yield axios.post('/api/gyms-near-me', action.payload)
    yield put({ type: 'SET_SEARCH', payload: response.data.results })

  }
  catch (error) {
    console.log('Error With POST', error);

  }
}

export default GymsNearMeSaga;