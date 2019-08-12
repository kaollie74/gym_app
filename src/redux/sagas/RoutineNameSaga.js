import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* RoutineNameSaga() {
  yield takeEvery('SET_ROUTINE_NAME', postRoutine);
  yield takeEvery('FETCH_ROUTINE_NAMES', fetchRoutine)
  yield takeEvery('RETRIEVE_SINGLE_ROUTINE', retrieveSingleRoutine)
  yield takeEvery('UPDATE_ROUTINE_CHECKBOX', updateRoutineCheckbox)
}

// Post a new Routine name to the data base
function* postRoutine(action) {
 
  try {
    axios.post('/routine/name', action.payload)
    yield put ({type: 'FETCH_ROUTINE_NAMES'})
  }
  catch (error){
    console.log('Error with posting to dataBase');
    
  }
}

  // Fetch the all the Routine names and store it in a reducer to access.
  function* fetchRoutine(){
    try {
      const response = yield axios.get(`/routine/name`)
      
      yield put ({type: 'INSTILL_ROUTINE_NAMES', payload: response.data})
    }
    catch(error){
      console.log('Error with getting routine name from DB', error)
    }
  }

  // This Generator function, when click on the DOM, will grab the specific
  // routine by its id and place it in the RoutineSingleNameReducer
  function* retrieveSingleRoutine (action){

    try {

      // AXIOS to get individual Routine name from routine table
      // and set it into its own reducer
      const response = yield axios.get(`/routine/name/${action.payload}`)
      yield put({ type: 'SET_SINGLE_NAME', payload: response.data })

      console.log(' this is in Retrieve single routine action.payload', action.payload);
      
      // Once the single routine is set, this will begin the process of retrieving
      // all the activities associated with that routine name.
      yield put({ type: 'GET_INITIAL_ACTIVITIES', payload: action.payload })
    }
    catch (error) {
      console.log('Error with getting routine name from DB', error)
    }
  }
  
  function* updateRoutineCheckbox (action) {
    try {
      yield axios.put(`/routine/update/${action.payload.id}`, action.payload);
      yield put({ type: 'FETCH_ROUTINE_NAMES'})
    }
    catch (error) {
      console.log('Error with updating the Activity in the DB', error);

    }
  }



export default RoutineNameSaga;