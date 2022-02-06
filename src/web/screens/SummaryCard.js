/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Chart from "./Chart.js";

const drawerWidth = "30vw";
const useStyles = makeStyles(() => ({
  root: {
    // height: "15.5rem",
    height: "36vh",
    margin: "0.5rem",
    borderRadius: "0.2rem",
    boxShadow: "none",
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    backgroundColor: "#273D49BF",
    width: drawerWidth,
  },
  contentShift: {
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    backgroundColor: "#273D49BF",
    width: "24.5vw",
  },
  icon: {
    width: "4rem",
    heigth: "4rem",
    margin: "0rem",
    padding: "0rem",
  },
  graph: {
    width: "25rem",
    marginLeft: "2rem",
  },
  graphshrink: {
    width: "20rem",
    overflow: "hidden",
    margin: "0",
  },
  details: {
    padding: "0.5rem 0.5rem",
    margin: "0rem",
    "& .MuiCardContent-root": {
      padding: "0rem",
      margin: "0rem",
    },
  },
}));

function SummaryCard(props) {
  const { open, data } = props;
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.content, classes.root, {
        [classes.contentShift]: open,
      })}
    >
      <CardContent className={classes.details}>
        {/* <p>{data.id}</p>{" "} */}
        <div
          style={{
            margin: "0rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {props.loading === true ? (
            <Skeleton
              variant="rect"
              width="12rem"
              height="2.5rem"
              animation="wave"
            />
          ) : (
            <Typography
              variant="body2"
              style={{ fontWeight: "900", color: "#FFFFFF80" }}
            >
              {props.searchfield.length >= 3 ? (
                <>
                  <span
                    style={{ background: "grey", textTransform: "uppercase" }}
                  >
                    {props.searchfield}
                  </span>
                  {data.customerName.substring(3)}
                </>
              ) : (
                data.customerName
              )}
            </Typography>
          )}

          <Typography variant="subtitle" style={{ color: "#FFFFFF80" }}>
            {data.customerNumber}
          </Typography>
        </div>
        <div
          style={{
            margin: "0rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            className={clsx(classes.graph, classes.root, {
              [classes.graphshrink]: open,
            })}
          >
            {props.loading === true ? (
              <div>
                <AutorenewIcon style={{ marginTop: "5rem" }} />
                <p>Loading....</p>
              </div>
            ) : (
              <Chart data={data} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  searchfield: state.searchfield,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryCard);
