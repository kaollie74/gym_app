import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ActivitySaga() {
  
  yield takeEvery('GET_ROUTINE_ACTIVITIES', getRoutineActivities)
  yield takeEvery('GET_INITIAL_ACTIVITIES', getInitialRoutineActivities )
  yield takeEvery('POST_ACTIVITY', postActivity);
  yield takeEvery('REMOVE_ACTIVITY', removeActivity);
}

// This function will POST an activity to the activity table
function* postActivity(action) {

  try {
    console.log('IN POST ACTIVITY GENERATOR FUNCTION', action.payload);
    
    yield axios.post('/activity', action.payload)

    yield put({ type: 'GET_ROUTINE_ACTIVITIES', payload: action.payload })
  }
  catch (error) {
    console.log('Error with posting to dataBase');

  }

}

function* getRoutineActivities(action) {

  try {
    console.log("in get Routine Activities", action.payload)

    const response = yield axios.get(`/activity/${action.payload.routine_id}`)

    console.log(' in getRoutineActivities action.payload is', action.payload)

    yield put({ type: 'SET_ROUTINE_ACTIVITIES', payload: response.data})
  }
  catch (error) {
    console.log('Error with GETTING information from the dataBase');

  }

}

function* getInitialRoutineActivities(action){
  try {
    console.log('IN GET initial routine activities generator function. action.payload is:', action.payload)

    const response = yield axios.get(`/activity/${action.payload}`)

    yield put ({type: 'SET_ROUTINE_ACTIVITIES', payload: response.data})
  }
  catch(error) {
    console.log('Error with GETTING INITIAL routine activities', error);
    
  }
}

function* removeActivity (action){
  try{

    console.log('In Remove Activity', action.payload)
    yield axios.delete(`/activity/delete/${action.payload.id}`)
    yield put({type: 'GET_ROUTINE_ACTIVITIES', payload: action.payload})

  }
  catch(error){
    console.log('Error with removing Activity from Activity table', error);
    
  }
}


export default ActivitySaga;