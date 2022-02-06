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
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Chart from "./Chart.js";
import Broken from "../common/assets/Broken.svg";
import Nonbroken from "../common/assets/Nonbroken.svg";

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
    // width: "22.2rem",
    width: "24.5vw",
  },
  icon: {
    width: "4rem",
    heigth: "4rem",
    margin: "0rem",
    padding: "0rem",
  },
  graph: {
    width: "22rem",
    margin: "0rem",
  },
  graphshrink: {
    width: "18rem",
    overflow: "hidden",
    marginRight: "1.5rem",
  },
  details: {
    padding: "0.5rem 0.5rem",
    margin: "0rem",
    "& .MuiCardContent-root": {
      padding: "0rem",
      margin: "0rem",
    },
  },
  divide: {
    marginBottom: "3.5rem",
    marginTop: "1.5rem",
    width: "0.1rem",
    background: "#FFFFFF1A",
  },
}));

function SimpleCard(props) {
  const { open, data } = props;
  const classes = useStyles();
  return (
    <Card
      animation="wave"
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
                  {data.customerName.substring(props.searchfield.length)}
                </>
              ) : (
                data.customerName
              )}
            </Typography>
          )}
          {props.loading === true ? (
            <Skeleton
              variant="rect"
              width="8rem"
              height="2rem"
              animation="wave"
            />
          ) : (
            <Typography variant="subtitle" style={{ color: "#FFFFFF80" }}>
              {data.customerNumber}
            </Typography>
          )}
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
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divide}
            style={{ marginRight: "0.4rem" }}
          />
          <div
            style={{
              width: "5rem",
              margin: "auto",
              color: "#FFFFFFA6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {props.loading === true ? (
              <Skeleton
                variant="rect"
                width="4rem"
                height="8rem"
                animation="wave"
                margin="2rem"
              />
            ) : data.totalBrokenPromises === 0 ? (
              <div>
                <img src={Nonbroken} alt="ico" className={classes.icon} />
                <br />
                <Typography variant="caption">
                  No <br />
                  Broken Promises
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant="caption">
                  {data.totalBrokenPromises}
                </Typography>
                <br />
                <img src={Broken} alt="ico" className={classes.icon} />
                <br />
                <Typography variant="caption">Broken Promises</Typography>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
