import { combineReducers } from 'redux';
import articles from './ArticlesReducer';
import errors from './errorsReducer';
import favArticles from './FavArticlesReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import routineNames from './RoutineNamesReducer';
import routineSingle from './RoutineSingleName';
import activities from './ActivitiesReducer';
import editMode from './EditModeReducer';
import imagesReduce from './ImagesReducer';
import gymsNearMe from './GymsNearMeReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  articles,
  errors, // contains registrationMessage and loginMessage
  favArticles,
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  routineNames,
  routineSingle,
  activities,
  editMode,
  imagesReduce,
  gymsNearMe
});

export default rootReducer;
