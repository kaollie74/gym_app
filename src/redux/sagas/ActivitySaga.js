import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ActivitySaga() {
  yield takeEvery('POST_ACTIVITY', postActivity);
  yield takeEvery('GET_ROUTINE_ACTIVITIES', getRoutineActivities)
}

function* postActivity(action) {

  try {
    axios.post('/activity', action.payload)
    yield put({ type: 'GET_ROUTINE_ACTIVITIES', payload: action.payload })
  }
  catch (error) {
    console.log('Error with posting to dataBase');

  }

}

function* getRoutineActivities(action) {

  try {

    const response = yield axios.get(`/activity/${action.payload.routine_id}`)
    console.log('response.data', response.data)
    yield put({ type: 'SET_ROUTINE_ACTIVITIES', payload: response.data})
  }
  catch (error) {
    console.log('Error with GETTING information from the dataBase');

  }

}


export default ActivitySaga;