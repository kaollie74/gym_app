const favArticlesReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_FAV_ARTICLE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default favArticlesReducer;