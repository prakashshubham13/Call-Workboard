/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { rPagination } from "../common/reducers";

const useStyles = makeStyles(() => ({
  foot: {
    margin: "0rem 1.5rem 0rem 1.5rem",
    width: "85rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#FFFFFFA6",
  },
  foota: {
    marginLeft: "-3rem",
  },
  footb: {
    marginLeft: "12rem",
  },
  circle: {
    display: "inline-block",
    height: "0.5rem",
    width: "0.5rem",
    background: "#5DAAE0",
    margin: "0.8rem 0.2rem",
    borderRadius: "0.5rem",
  },
}));

function Footer(props) {
  const classes = useStyles();
  const { on, page, summary, searchfield, resultlist } = props;
  return (
    <div className={classes.foot}>
      {searchfield.length > 2 ? (
        <p>
          Viewing {resultlist[0].count === 0 ? 0 : page * 6 + 1}-
          {resultlist[0].count} of {resultlist[0].count}
        </p>
      ) : (
        <p>
          Viewing {page * 5 + 1} - {page * 5 + 5} of{" "}
          {summary.totalCustomerCount - summary.processedCustomerCount}
        </p>
      )}
      <div className={on ? classes.foota : classes.footb}>
        <div
          className={classes.circle}
          style={{ background: page === 0 ? "#FC7500" : "#5DAAE0" }}
        />
        <div
          className={classes.circle}
          style={{ background: page === 1 ? "#FC7500" : "#5DAAE0" }}
        />
        <div
          className={classes.circle}
          style={{ background: page === 2 ? "#FC7500" : "#5DAAE0" }}
        />
      </div>
      <p>© Copyright 2018 HighRadius. All Rights Reserved.</p>
    </div>
  );
}
const mapStateToProps = (state) => ({
  page: state.page,
  summary: state.summary,
  searchfield: state.searchfield,
  resultlist: state.resultlist,
});

const mapDispatchToProps = (dispatch) => ({
  rPagination: (page) => dispatch(rPagination(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
