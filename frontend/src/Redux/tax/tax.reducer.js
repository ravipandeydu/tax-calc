import {
  GET_RESULT_ERROR,
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
  GET_INPUT_SUCCESS,
} from "./tax.types";

let initialState = {
  loading: false,
  error: false,
  input: [],
  result: [],
};

export const taxReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RESULT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_RESULT_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        input: [],
        result: payload,
      };
    }
    case GET_INPUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        input: payload,
        result: [],
      };
    }
    default: {
      return state;
    }
  }
};
