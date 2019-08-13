import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteRoutineSaga () {
  yield takeEvery('DELETE_ROUTINE', removeRoutine )

}

function* removeRoutine (action) {
  try{
    console.log('In removeRoutine')
    yield axios.delete(`/routine/delete/${action.payload.id}`, action.payload)
    yield put({ type: 'FETCH_ROUTINE_NAMES'})
  }
  catch(error){
    console.log('error with getting to the server from removeRoutine', error)
  }
}

export default deleteRoutineSaga;