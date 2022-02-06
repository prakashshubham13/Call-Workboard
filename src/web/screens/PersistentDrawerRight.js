/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Icon from "../common/assets/icon.svg";
import Meicon from "../common/assets/meicon.svg";
import SimpleCard from "./SimpleCard";
import SummaryCard from "./SummaryCard";
// eslint-disable-next-line no-unused-vars
import { rSearch, rSummary, rResult, rPagination } from "../common/reducers";
import Pagination from "./Pagination";
import fetchResult from "../common/reducers/cake/Utility.js";

const drawerWidth = "18rem";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  // appBar: {
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginRight: drawerWidth,
  // },
  // title: {
  //   flexGrow: 1,
  // },
  hide: {
    display: "none",
  },
  drawer: {
    height: "39rem",
    width: "24vw",
    flexShrink: 0,
    border: "none",
    "& .MuiDrawer-paper": {
      position: "relative",
      background: "#2D4250",
      border: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    borderTop: "0.2rem solid #FC7500",
    background: "#2D4250",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    // justifyContent: "flex-start",
  },
  content: {
    // flexGrow: 1,
    // // padding: theme.spacing(3),
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    marginRight: "-5rem",
    width: "95vw",
    heigth: "87vh",
    // background: "lime",
  },
  contentShift: {
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    marginRight: "0rem",
    width: "78vw",
  },
  tabs: {
    // "& .MuiTabs-fixed": {
    //   backgroundColor: "red",
    //   width: "35rem",
    //   padding: "0rem",
    //   margin: "0rem",
    // },
    "& .MuiTabs-scroller": {
      width: "36.5rem",
      height: "3rem",
      padding: "0rem",
      margin: "0rem",
    },
    "& .Mui-selected": {
      color: "#FFFFFFA6",
    },
    "& .Mui-disabled": {
      color: "#5DAAE0BF",
    },
    // "& .MuiTab-root": {
    //   padding: "0rem",
    //   margin: "0rem",
    //   backgroundColor: "green",
    //   height: "3rem",
    //   width: "11rem",
    //   color: "#5DAAE0BF",
    //   fontSize: "0.8rem",
    // },
    // "& .MuiButtonBase-root": {
    //   padding: "0rem",
    //   margin: "0rem",
    //   height: "3rem",
    //   backgroundColor: "green",
    // },
    // "& .MuiTab-wrapper": {
    //   width: "11rem",
    //   height: "3rem",
    //   padding: "0rem",
    //   margin: "0rem",
    //   backgroundColor: "lime",
    // },
  },
  tab: {
    display: "block",
    padding: "0.2rem",
    margin: "0.2rem",
    minHeight: "3rem",
    minWidth: "12rem",
    maxHeight: "3rem",
    maxWidth: "12rem",
    color: "#5DAAE0BF",
    fontSize: "0.8rem",
  },
  indicator: {
    backgroundColor: "white",
    maxWidth: "13rem",
    maxHeight: "0.1rem",
    minWidth: "13rem",
    minHeight: "0.1rem",
  },
  selected: {
    backgroundColor: "#FFFFFFA6",
  },
  closeIcon: {
    height: "2rem",
    position: "absolute",
    // pointerEvents: "none",
    cursor: "pointer",
    right: "0rem",
    display: "flex",
    alignItems: "flex-end",
    padding: "0rem 0.1rem",
    borderRadius: "2rem",
    zIndex: "99",
    color: "#FFFFFFA6",
    marginTop: "0.5rem",
  },
  divide: {
    width: "0.1rem",
    margin: "0 0.8rem 0 0.8rem",
    marginTop: "0rem",
  },
  symbol: {
    width: "1.8rem",
    height: "1.8rem",
    margin: "0 0.5rem",
  },
}));

function PersistentDrawerRight(props) {
  const { on } = props;
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [one, setOne] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.onSelect();
  };

  const check = () => {
    handleDrawerOpen();
  };
  useEffect(() => check, [on]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchChange = () => {
    // alert("d");
    if (props.searchfield.length >= 2) setValue(2);
    else setValue(0);
  };
  const clear = () => {
    props.rSearch("");
    props.rPagination(0);
    props.rResult("", 0);
  };
  useEffect(() => handleSearchChange, [props.searchfield]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <IconButton
        // style={{ position: "fixed", top: "0rem", right: "2rem" }}
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <br /> */}
      <main
        style={{ margin: "0 0.5rem" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* <div className={classes.drawerHeader} /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "4rem",
            margin: "0 0rem 0 0.8rem",
          }}
        >
          <Tabs
            className={classes.tabs}
            classes={{
              indicator: classes.indicator,
              selected: classes.selected,
            }}
            value={value}
            indicatorColor="red"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab
              // inkBarStyle={{ background: "red" }}
              className={classes.tab}
              label={`to call list (${props.summary.totalCustomerCount})`}
              onClick={clear}
              style={
                props.searchfield.length === 0 ? { color: "#FFFFFFA6" } : {}
              }
            />
            <Tab className={classes.tab} label="Finished Call List" disabled />
            {props.searchfield.length > 2 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Tab
                  className={classes.tab}
                  label={`search list (${props.resultlist[0].count})`}
                  style={{ color: "white" }}
                />
                <div className={classes.closeIcon}>
                  <CloseIcon onClick={clear} />
                </div>
              </div>
            ) : null}
          </Tabs>
          {props.searchfield.length > 2 ? (
            <p />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "3.5rem",
                textAlign: "left",
              }}
            >
              <div style={{ width: "10rem", color: "#FFFFFF" }}>
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  {props.summary.processedCustomerCount}/
                  <span style={{ fontSize: "1rem", color: "#FFFFFFA6" }}>
                    {props.summary.totalCustomerCount}
                  </span>
                </Typography>
                <p style={{ marginTop: "0rem", color: "#5DAAE0" }}>
                  Total Customers Called
                </p>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divide}
              />
              <div style={{ width: "10rem", color: "#FFFFFF" }}>
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  {Math.floor(props.summary.completedCallingMinutes / 60)}
                  <span style={{ fontSize: "1rem" }}>hr</span>{" "}
                  {props.summary.completedCallingMinutes % 60}
                  <span style={{ fontSize: "1rem" }}>min</span>/
                  <span style={{ fontSize: "1rem", color: "#FFFFFFA6" }}>
                    ({Math.floor(props.summary.expectedCallingMinutes / 60)}hr
                    {Math.floor(props.summary.expectedCallingMinutes % 60)}min)
                  </span>
                </Typography>
                <p style={{ marginTop: "0rem", color: "#5DAAE0" }}>
                  Total Time Spent on Call
                </p>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divide}
              />
              <div style={{ width: "10rem", color: "#FFFFFF" }}>
                <Typography variant="h5" style={{ fontWeight: "500" }}>
                  $
                  {Number(props.summary.totalPastDueProcessed * 0.000001)
                    .toString()
                    .substring(0, 4)}
                  /
                  <span style={{ fontSize: "1rem", color: "#FFFFFFA6" }}>
                    $
                    {Number(props.summary.totalPastDueAmount * 0.000001)
                      .toString()
                      .substring(0, 4)}
                    M
                    {/* ${Math.round(props.summary.totalPastDueAmount * 100) / 100}M */}
                  </span>
                </Typography>
                <p style={{ marginTop: "0rem", color: "#5DAAE0" }}>
                  Total Past Due Touched
                </p>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.error === true ||
          props.resultlist[0].count === 0 ||
          props.summary.totalCustomerCount === 0 ? (
            <div
              style={{
                margin: "auto",
                marginTop: "15rem",
              }}
            >
              {props.error === false && props.resultlist[0].count === 0 ? (
                <h1>No Matching Results Found</h1>
              ) : props.error === false &&
                props.summary.totalCustomerCount === 0 ? (
                <h1>No Customers available for calling</h1>
              ) : (
                <h1>Error</h1>
              )}
            </div>
          ) : (
            <>
              {" "}
              {props.resultlist.map((data) => (
                // eslint-disable-next-line react/no-array-index-key
                <SimpleCard open={open} data={data} />
              ))}
              {props.searchfield.length > 2 ||
              props.page ===
                (props.summary.totalCustomerCount -
                  props.summary.processedCustomerCount) /
                  5 -
                  1 ? null : (
                <SummaryCard open={open} data={props.upcoming} />
              )}
            </>
          )}
        </div>
        <Pagination open={open} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className={classes.drawerHeader}>
          <div
            style={{
              width: "16.5vw",
              height: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0.6rem 0.3rem",
            }}
          >
            <Typography style={{ color: "#FFFFFF" }}>FREEDA</Typography>
            <CloseIcon
              style={{ color: "#FFFFFF" }}
              onClick={handleDrawerClose}
            />
          </div>
        </div>
        <div style={{ width: "17.5vw" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0 0.4rem",
            }}
          >
            <img src={Icon} alt="ico" className={classes.symbol} />
            <Typography variant="caption" style={{ textAlign: "left" }}>
              Hi John,
              <br />
              how can I help you?
            </Typography>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginRight: "0.5rem",
            }}
          >
            <img src={Meicon} alt="ico" className={classes.symbol} />
            <Typography variant="caption" style={{ textAlign: "left" }}>
              Pull up account walmart
            </Typography>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0 0.4rem",
            }}
          >
            <img src={Icon} alt="ico" className={classes.symbol} />
            <Typography variant="caption" style={{ textAlign: "left" }}>
              Hi John,
              <br />
              how can I help you?
            </Typography>
          </div>
          <br />
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "center",
                background: "#37576D",
                margin: "0.5rem",
                padding: "0 0.4rem",
                borderRadius: "0.1rem",
                color: "#5F798A",
              }}
            >
              <Typography variant="caption" style={{ fontWeight: "900" }}>
                Walmart USA
              </Typography>
              <Typography variant="caption">4435434232</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "center",
                background: "#37576D",
                margin: "0.5rem",
                padding: "0 0.4rem",
                borderRadius: "0.1rem",
                color: "#5F798A",
              }}
            >
              <Typography variant="caption" style={{ fontWeight: "900" }}>
                Walmart USA
              </Typography>
              <Typography variant="caption">4435434232</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "center",
                background: "#37576D",
                margin: "0.5rem",
                padding: "0 0.4rem",
                borderRadius: "0.1rem",
                color: "#5F798A",
              }}
            >
              <Typography variant="caption" style={{ fontWeight: "900" }}>
                Walmart USA
              </Typography>
              <Typography variant="caption">4435434232</Typography>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginRight: "0.5rem",
              }}
            >
              <img src={Meicon} alt="ico" className={classes.symbol} />
              <Typography variant="caption" style={{ textAlign: "left" }}>
                Pull up account walmart
              </Typography>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchfield: state.searchfield,
  summary: state.summary,
  resultlist: state.resultlist,
  error: state.error,
  loading: state.loading,
  upcoming: state.upcoming,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  rPagination: (page) => dispatch(rPagination(page)),
  rSearch: (searchfield) => dispatch(rSearch(searchfield)),
  rSummary: (summary) => dispatch(rSummary(summary)),
  rResult: (search, page) => {
    dispatch(fetchResult(search, page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerRight);
