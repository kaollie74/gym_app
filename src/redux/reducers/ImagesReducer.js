const imageReducer = (state = [], action) => {
  if(action.type === 'SET_IMAGES'){
    let array = action.payload;

    let random = Math.floor(Math.random() * (array.length));
    return action.payload[random];
    // return action.payload;
  }
  return state;
}

export default imageReducer;