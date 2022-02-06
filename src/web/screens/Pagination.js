/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import { rPagination, rLoading, rError } from "../common/reducers";
import fetchResult from "../common/reducers/cake/Utility.js";

const useStyles = makeStyles(() => ({
  nava: {
    right: "17.5rem !important",
  },
  navb: {
    position: "fixed",
    top: "23.2rem",
    right: "1rem",
    backgroundColor: "#5DAAE0",
    borderRadius: "5rem",
    color: "white",
  },
  leftarrow: {
    position: "fixed",
    top: "23.2rem",
    left: "4rem",
    background: "#5DAAE0",
    borderRadius: "5rem",
    color: "white",
  },
}));
function Pagination(props) {
  const classes = useStyles();
  const { open, searchfield, page, summary, error, resultlist } = props;

  const back = () => {
    if (props.page === 0) return;
    props.rResult(searchfield, page - 1);
    props.rPagination(page - 1);
  };
  const front = () => {
    if (page === 2) return;
    props.rResult(searchfield, page + 1);
    props.rPagination(page + 1);
  };
  return (
    <div style={{}}>
      <h1>{props.open}</h1>
      {error === true || resultlist[0].count === 0 ? null : (
        <>
          <NavigateBeforeIcon
            className={classes.leftarrow}
            style={page === 0 ? { display: "none" } : {}}
            onClick={back}
          />
          <NavigateNextIcon
            className={clsx(classes.navb, {
              [classes.nava]: open,
            })}
            style={
              page ===
                (summary.totalCustomerCount - summary.processedCustomerCount) /
                  5 -
                  1 ||
              page === Math.floor(resultlist[0].totalCustomerCount - 1 / 6)
                ? { display: "none" }
                : {}
            }
            onClick={front}
          />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchfield: state.searchfield,
  page: state.page,
  summary: state.summary,
  error: state.error,
  resultlist: state.resultlist,
});

const mapDispatchToProps = (dispatch) => ({
  rPagination: (page) => dispatch(rPagination(page)),
  rLoading: (flag) => dispatch(rLoading(flag)),
  rError: () => dispatch(rError()),
  rResult: (search, page) => {
    dispatch(fetchResult(search, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
