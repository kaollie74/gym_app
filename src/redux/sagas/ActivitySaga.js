import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ActivitySaga() {
  
  yield takeEvery('GET_ROUTINE_ACTIVITIES', getRoutineActivities)
  yield takeEvery('GET_INITIAL_ACTIVITIES', getInitialRoutineActivities )
  yield takeEvery('POST_ACTIVITY', postActivity);
  yield takeEvery('REMOVE_ACTIVITY', removeActivity);
  yield takeEvery('EDIT_ACTIVITY', editActivity)
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
// generator function that retrieves all activities by targeting
// the routine_id,
// then sends that data to  the ActivitiesReducer
function* getRoutineActivities(action) {

  try {
    
    const response = yield axios.get(`/activity/${action.payload.routine_id}`)


    yield put({ type: 'SET_ROUTINE_ACTIVITIES', payload: response.data})
  }
  catch (error) {
    console.log('Error with GETTING information from the dataBase');

  }

}

// generator function that retrieves the routine name and day from 'routine' table
// and sets into Activity Reducer
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

// generator function that will remove activity from the 'activities' table 
// then runs put to activate the getRoutineActivities generator function
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
// This generator function runs an 'Axios.put'. Afterwards, it runs a
// a put to activate the getRoutineActivities generator function
function* editActivity (action){
  try{
    yield axios.put(`/activity/update/${action.payload.id}`, action.payload);
    yield put ({type: 'GET_ROUTINE_ACTIVITIES', payload: action.payload})
  }
  catch(error){
    console.log('Error with updating the Activity in the DB', error);
    
  }
}


export default ActivitySaga;