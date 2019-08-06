import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* RoutineNameSaga() {
  yield takeEvery('SET_ROUTINE_NAME', postRoutine);
  yield takeEvery('FETCH_ROUTINE_NAME', fetchRoutine)
}

function* postRoutine(action) {
 
  try {
    axios.post('/routine/name', action.payload)
    yield put ({type: 'FETCH_ROUTINE_NAME'})
  }
  catch (error){
    console.log('Error with posting to dataBase');
    
  }
}

  
  function* fetchRoutine(){
    try {
      const response = yield axios.get('/routine/name')
      
      yield put ({type: 'INSTILL_ROUTINE_NAME', payload: response.data})
    }
    catch(error){
      console.log('Error with getting routine name from DB', error)
    }
  }



export default RoutineNameSaga;