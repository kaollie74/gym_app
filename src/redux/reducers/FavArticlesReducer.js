const favArticlesReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_FAV_ARTICLES':
      return action.payload;
    default:
      return state;
  }
};

export default favArticlesReducer;