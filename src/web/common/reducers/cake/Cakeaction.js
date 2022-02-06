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

export const rSummary = (data) => ({
  type: R_SUMMARY,
  payload: data,
});
export const rSearch = (data) => ({
  type: R_SEARCH,
  payload: data,
});
export const rResult = (data) => ({
  type: R_RESULT,
  payload: data,
});
export const rUpcoming = (data) => ({
  type: R_UPCOMING,
  payload: data,
});
export const rPagination = (data) => ({
  type: R_PAGINATION,
  payload: data,
});
export const rSearchresult = () => ({
  type: R_SEARCHRESULT,
});
export const rLoading = (data) => ({
  type: R_LOADING,
  payload: data,
});
export const rError = () => ({
  type: R_ERROR,
});
