
const EditModeReducer = (state = {
  body_part: '',
  comments: '',
  completed: '',
  exercise: '',
  id: '',
  reps: '',
  routine_id: '',
  sets: '',
}, action) => {
  switch (action.type) {
    case 'EDIT_MODE':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default EditModeReducer;
