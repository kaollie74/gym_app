import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* RoutineSaga() {
  yield takeEvery('POST_ACTIVITY', postActivity);
}

function* postActivity(action) {

  try {
    axios.post('/routine/activity', action.payload)
    //yield put({ type: 'GET_ROUTINE_NAME' })
  }
  catch (error) {
    console.log('Error with posting to dataBase');

  }

}



export default RoutineSaga;