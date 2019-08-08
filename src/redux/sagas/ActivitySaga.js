import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ActivitySaga() {
  yield takeEvery('POST_ACTIVITY', postActivity);
  yield takeEvery('GET_ROUTINE_ACTIVITIES', getRoutineActivities)
  yield takeEvery('REMOVE_ACTIVITY', removeActivity)
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

function* removeActivity (action){
  try{

    console.log('In Remove Activity', action.payload)
    
    yield axios.delete(`/activity/delete/${action.payload}`)
    //yield put({type: 'GET_ROUTINE_ACTIVITIES'})
  }
  catch(error){
    console.log('Error with removing Activity from Activity table', error);
    
  }
}


export default ActivitySaga;