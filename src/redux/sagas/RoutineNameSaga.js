import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* RoutineNameSaga() {
  yield takeEvery('SET_ROUTINE_NAME', postRoutine);
}

function* postRoutine(action) {
 
  try {
    axios.post('/routine/name', action.payload)
    yield put ({type: 'GET_ROUTINE_NAME'})
  }
  catch (error){
    console.log('Error with posting to dataBase');
    
  }

}



export default RoutineNameSaga;