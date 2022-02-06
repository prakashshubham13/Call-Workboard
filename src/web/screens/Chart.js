/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
// import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  // chart: {
  //   width: "20rem",
  //   height: "10rem",
  //   margin: "0rem",
  //   background: "red !important",
  //   overflow: "hidden",
  // },
}));

export default function Chart(props) {
  const { data } = props;
  const classes = useStyles();
  const options = {
    chart: {
      type: "column",
      borderColor: "transparent",
      backgroundColor: "transparent",
      reflow: true,
      style: {
        height: "13rem",
        width: "22rem",
        // backgroundColor: "red",
        // overflow: "scroll",
        marginBottom: "3rem",
      },
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: data.bucketNames,
      labels: {
        autoRotation: false,
        style: {
          color: "#FFFFFFA6",
          fontSize: "0.5rem",
          padding: "0",
          margin: "0",
        },
      },
      lineColor: "#FFFFFF80",
      lineWidth: 0.1,
      tickLength: 0,
      title: "",
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: "none",
          style: {
            color: "#FFFFFFD9",
            textShadow: false,
            fontSize: "0.6rem",
            fontWeight: "100",
            shadow: "none",
            textOutline: false,
          },
          formatter: function () {
            const sum = data.pastDueBucketDocumentAmount.reduce(
              (a, b) => a + b,
              0
            );
            // eslint-disable-next-line react/no-this-in-sfc
            const per = ((this.point.y / sum) * 100).toFixed(0);
            const amt = (this.point.y / 100).toFixed(0);
            // eslint-disable-next-line react/no-this-in-sfc
            return `$${amt}M<br/>${per}%`;
          },
        },
      },
    },
    yAxis: {
      // formatter() {
      //   console.log(value);
      // },
      visible: false,
    },
    series: [
      {
        data: data.pastDueBucketDocumentAmount,
        color: "#5DAAE0",
        borderColor: "none",
        showInLegend: false,
      },
    ],
  };
  return (
    <div style={{ position: "relative" }}>
      <br />
      <HighchartsReact
        containerProps={{
          style: {
            maxHeight: "15rem",
            maxWidth: "20rem",
            minHeight: "15rem",
            minWidth: "20rem",
          },
        }}
        highcharts={Highcharts}
        options={options}
        className={classes.chart}
      />
    </div>
  );
}
