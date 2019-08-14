import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchImagesSaga() {
  yield takeEvery('FETCH_IMAGES', getImages)

}

function* getImages() {
  try {
    const response = yield axios.get(`/api/images`)

    yield put({ type: 'SET_IMAGES', payload: response.data })
  }
  catch (error) {
    console.log('Error with getting routine name from DB', error)
  }
}

export default fetchImagesSaga;