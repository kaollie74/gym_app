import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* ArticleSaga() {
  yield takeEvery ('FETCH_ARTICLES', fetchArticles)
  yield takeEvery ('ADD_FAV_ARTICLE', addArticle)
  yield takeEvery ('FETCH_FAV_ARTICLES', fetchFavArticles)
  yield takeEvery ('REMOVE_FAV_ARTICLE', removeFavArticle)
}

function* addArticle(action) {
  console.log(`in addArticle`, action.payload)
  yield axios.post('/articles/fav', action.payload)

  yield put({type: 'FETCH_FAV_ARTICLES'})

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

// fetch all favorite articles that reside in the DB
function* fetchFavArticles () {
  const response = yield axios.get('/articles/get-fav/')
  yield put ({type: 'SET_FAV_ARTICLES', payload: response.data})
}

function* removeFavArticle (action) {

  console.log('IN removeFavArticle', action.payload.id)

  yield axios.delete(`/articles/delete/${action.payload.id}`)
  yield put({type:`FETCH_FAV_ARTICLES`})
}

export default ArticleSaga;