import { all } from 'redux-saga/effects';
import articleSaga from './ArticleSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import RoutineNameSaga from './RoutineNameSaga';
import ActivitySaga from './ActivitySaga';
import DeleteRoutine from './DeleteRoutineNameSage';
import UpdateRoutineName from './UpdateRoutineNameSaga';
import FetchImagesSaga from './FetchImagesSaga';
import GymsNearMeSaga from './GymsNearMeSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    articleSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
    RoutineNameSaga(),
    ActivitySaga(),
    DeleteRoutine(),
    UpdateRoutineName (),
    FetchImagesSaga(),
    GymsNearMeSaga(),

  ]);
}
