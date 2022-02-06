import {
  R_SUMMARY,
  R_SEARCH,
  R_RESULT,
  R_PAGINATION,
  R_SEARCHRESULT,
  R_LOADING,
  R_ERROR,
  R_UPCOMING,
} from "./Caketype";

const initialStore = {
  searchfield: "",
  summary: {},
  resultlist: [{}],
  loading: false,
  error: false,
  page: 0,
  size: 5,
  upcoming: {},
};

const invoiceReducer = (state = initialStore, action) => {
  switch (action.type) {
    case R_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case R_SEARCH:
      return {
        ...state,
        searchfield: action.payload,
      };
    case R_PAGINATION:
      return {
        ...state,
        page: action.payload,
      };
    case R_RESULT:
      return {
        ...state,
        loading: false,
        resultlist: action.payload,
      };
    case R_SEARCHRESULT:
      return {
        ...state,
      };
    case R_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case R_ERROR:
      return {
        ...state,
        error: true,
      };
    case R_UPCOMING:
      return {
        ...state,
        upcoming: action.payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
