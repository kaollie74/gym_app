import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ArticleSaga() {
  yield takeEvery ('FETCH_ARTICLES', fetchArticles)
}

function* fetchArticles(action){
  try{
    const response = yield axios.post('/articles', action.payload)
    yield put ({type: 'SET_ARTICLES', payload: response.data.articles})
  }
  catch(error){
    console.log(`Error with fetching Articles from API`, error)
  }
}

export default ArticleSaga;