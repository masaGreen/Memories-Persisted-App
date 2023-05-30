const Reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MOMENTS":
      return {
        isFetching: true,
        moments: [],
        error: null,
      };
    case "LOADING_SUCCESS":
      return {
        isFetching: false,
        moments: action.payload,
        error: null,
      };
    case "LOADING_FAILURE":
      return {
        isFetching: false,
        moments: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;
