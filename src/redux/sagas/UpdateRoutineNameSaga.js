import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* updateRoutineNameSaga() {
  yield takeEvery('UPDATE_ROUTINE_NAME', modifyRoutineName)

}

function* modifyRoutineName(action) {
  try {
    console.log('In UpdateRoutineName', action.payload)
    yield axios.put(`/routine/modify/${action.payload.id}`, action.payload)
    yield put({ type: 'FETCH_ROUTINE_NAMES' })
  }
  catch (error) {
    console.log('error with getting to the server from removeRoutine', error)
  }
}

export default updateRoutineNameSaga;