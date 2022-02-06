/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import "./Home.css";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { connect } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Footer from "./Footer";
import Symbol1 from "../common/assets/Symbol1.svg";
import Symbol2 from "../common/assets/Symbol2.svg";
import Icon from "../common/assets/icon.svg";
import PersistentDrawerRight from "./PersistentDrawerRight";
import TemporaryDrawer from "./TemporaryDrawer";
import { rSearch, rSummary, rUpcoming, rPagination } from "../common/reducers";
import fetchResult from "../common/reducers/cake/Utility.js";

const useStyles = makeStyles({
  sidebar: {
    width: "20rem",
    padding: "0",
    margin: "0",
  },
  menubar: {
    height: "87vh",
    overflow: "hidden",
    // background: "red",
  },
  search: {
    position: "relative",
    borderRadius: "2rem",
    border: "0.1rem solid #5DAAE0",
    "&:hover": {},
    marginLeft: 0,
    width: "13.5rem",
    height: "2.5rem",
    borderLeft: "0rem",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#5DAAE0",
    padding: "0rem 0.5rem",
    borderRadius: "2rem",
    fontSize: "2.3rem",
    zIndex: "100",
    color: "white",
  },
  closeIcon: {
    height: "100%",
    position: "absolute",
    cursor: "pointer",
    right: "0rem",
    display: "flex",
    alignItems: "center",
    padding: "0rem 0.5rem",
    borderRadius: "2rem",
    fontSize: "0.5rem",
    zIndex: "100",
    color: "#5DAAE0",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    position: "relative",
    overflow: "hidden",
    top: "0rem",
    padding: "0",
    paddingLeft: "0.5rem",
    width: "8rem",
    fontSize: "0.8rem",
    height: "2.5rem",
    color: "white",
  },
  fab: {
    background: "#FC7500",
    width: "6rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    color: "white",
    padding: "1rem 0.5rem",
    margin: "0 0.5rem 0 0.5rem ",
    fontSize: "0.6rem",
    borderRadius: "2rem",
    boxShadow: "none",
    // "& :hover": {
    //   background: "#FC7500",
    //   borderRadius: "2rem",
    // },
  },
  tag: {
    position: "relative",
    top: "-1rem",
    display: "flex",
    flexDirection: "row",
    width: "14.9rem",
    flexWrap: "no-wrap",
    background: "#FC7500",
    color: "white",
    padding: "0rem 0.5rem",
    borderRadius: "0 0 1.2rem 1.2rem",
    height: "2.1rem",
    marginLeft: "3rem",
  },
  symbol: {
    width: "2rem",
    height: "2rem",
  },
  icon: {
    width: "2.5rem",
    height: "2.5rem",
    transform: "translate(0.5rem,0rem)",
  },
});

function Home(props) {
  const { page } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearch] = useState("");
  const [on, setOn] = React.useState(false);
  const postData = {
    num: 0,
    page: 5,
  };
  const fetchData = () => {
    props.rResult(props.searchfield, page);
    axios
      .post(
        `http://localhost:4000/getUserCallWorkBook.do?pageNumber=0&pageSize=5`,
        postData
      )
      .then((response) => {
        props.rSummary(response.data.overview);
      });

    axios
      .post(
        `http://localhost:4000/getUpcomingSummary.do?pageNumber=0&pageSize=5`
      )
      .then((res) => {
        const upcomingdata = {
          pastDueBucketDocumentAmount:
            res.data.upcomingPastDueBucketDocumentAmount,
          customerName: "Remaining Balance Summary",
          bucketNames: ["1-30", "31-60", "61-90", "91-190", "181-360", ">360"],
        };
        props.rUpcoming(upcomingdata);
      });
  };

  useEffect(fetchData, []);
  const searchFunction = (e) => {
    // setSearch(e.target.value);
    props.rSearch(e.target.value);
    if (e.target.value.length > 2) {
      props.rPagination(0);
      props.rResult(e.target.value, 0);
    }
  };
  const clear = () => {
    props.rSearch("");
    props.rPagination(0);
    props.rResult("", 0);
  };
  return (
    <div className="Home">
      <div className={classes.sidebar}>
        <TemporaryDrawer />
      </div>
      <div>
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "0.5rem 0.5rem 0 0",
            width: "96.5vw",
            height: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0rem 0.2rem 0rem 0.7rem",
            }}
          >
            <ArrowBackIcon style={{ margin: "0.5rem 0 0 0", color: "white" }} />
            <Typography
              style={{
                margin: "0rem 0.5rem",
                fontSize: "1.7rem",
                color: "#5DAAE0",
              }}
            >
              Call Workboard
            </Typography>
          </div>
          <div className={classes.tag}>
            <img src={Symbol2} alt="ico" className={classes.symbol} />
            <Typography
              variant="caption"
              style={{ marginTop: "0.5rem", padding: "0 0.5rem" }}
            >
              AUTONOMOUS
              <span style={{ paddingLeft: "0.2rem" }}>RECEIVABLES</span>{" "}
            </Typography>
            <img src={Symbol1} alt="ico" className={classes.symbol} />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {props.searchfield.length > 0 ? (
                <div className={classes.closeIcon}>
                  <CloseIcon onClick={clear} />
                </div>
              ) : (
                <div className={classes.closeIcon}>
                  <ArrowDropDownIcon />
                </div>
              )}
              <InputBase
                spellCheck="false"
                placeholder="Search Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={props.searchfield}
                onChange={(e) => {
                  searchFunction(e);
                }}
              />
            </div>
            <Fab
              className={classes.fab}
              onClick={() => {
                setOn(true);
              }}
            >
              <Typography variant="subtitle">FREEDA</Typography>
              <img src={Icon} alt="ico" className={classes.icon} />
            </Fab>
          </div>
        </div>
        <div className={classes.menubar}>
          <PersistentDrawerRight on={on} onSelect={() => setOn(false)} />
        </div>

        <Footer on={on} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchfield: state.searchfield,
  summary: state.summary,
  page: state.page,
  size: state.size,
});

const mapDispatchToProps = (dispatch) => ({
  rPagination: (page) => dispatch(rPagination(page)),
  rSearch: (searchfield) => dispatch(rSearch(searchfield)),
  rSummary: (summary) => dispatch(rSummary(summary)),
  rResult: (search, page) => {
    dispatch(fetchResult(search, page));
  },
  rUpcoming: (upcoming) => dispatch(rUpcoming(upcoming)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
