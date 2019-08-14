
const RoutineNamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'INSTILL_ROUTINE_NAMES':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default RoutineNamesReducer;
