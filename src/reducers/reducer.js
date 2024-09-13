const initialState = {
  selectedOption: 'status',
  selectedOption2: 'order-priority',
};

const changeTheState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_OPTION':
      return { ...state, selectedOption: action.payload };
    case 'SET_SELECTED_OPTION2':
      return { ...state, selectedOption2: action.payload };
    default:
      return state;
  }
};

export default changeTheState;
