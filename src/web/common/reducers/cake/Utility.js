import axios from "axios";
import { rLoading, rError, rUpcoming } from "./Cakeaction.js";

const fetchResult = (search, num) => (dispatch) => {
  dispatch(rLoading(true));
  axios
    .post(
      `http://localhost:4000/getUpcomingSummary.do?pageNumber=${num}&pageSize=5`
    )
    .then((res) => {
      const upcomingdata = {
        pastDueBucketDocumentAmount:
          res.data.upcomingPastDueBucketDocumentAmount,
        customerName: "Remaining Balance Summary",
        bucketNames: ["1-30", "31-60", "61-90", "91-190", "181-360", ">360"],
      };
      dispatch(rUpcoming(upcomingdata));
    });
  setTimeout(() => {
    if (search.length < 3) {
      axios
        .post(
          `http://localhost:4000/getUserCallWorkBook.do?pageNumber=${num}&pageSize=5`
        )
        .then(
          (response) => {
            dispatch({
              type: "R_RESULT",
              payload: response.data.workbookItems,
            });
          },
          () => {
            dispatch(rError());
          }
        );
    } else {
      axios
        .post(`http://localhost:4000/esCustomerSearch.do`, {
          customerName: search,
        })
        .then(
          (response) => {
            let data = [];
            if (response.data.total === 0) {
              data = [
                {
                  count: response.data.total,
                },
              ];
            } else {
              for (let i = 0; i < response.data.total; i += 1) {
                data.push({
                  count: response.data.total,
                  customerName: response.data.customer[i].customerName,
                  customerNumber: response.data.customer[i].processorId,
                  totalBrokenPromises:
                    response.data.customer[i].broken_p2P_count,
                  pastDueBucketDocumentAmount: [
                    response.data.customer[i].pastdue_bucket1_amount,
                    response.data.customer[i].pastdue_bucket2_amount,
                    response.data.customer[i].pastdue_bucket3_amount,
                    response.data.customer[i].pastdue_bucket4_amount,
                    response.data.customer[i].pastdue_bucket5_amount,
                    response.data.customer[i].pastdue_bucket6_amount,
                  ],
                  bucketNames: response.data.bucketNames,
                  totalCustomerCount: response.data.total,
                });
              }
              // data = [
              //   {
              //     count: response.data.total,
              //     customerName: response.data.customer[0].customerName,
              //     customerNumber: response.data.customer[0].processorId,
              //     totalBrokenPromises:
              //       response.data.customer[0].broken_p2P_count,
              //     pastDueBucketDocumentAmount: [
              //       response.data.customer[0].pastdue_bucket1_amount,
              //       response.data.customer[0].pastdue_bucket2_amount,
              //       response.data.customer[0].pastdue_bucket3_amount,
              //       response.data.customer[0].pastdue_bucket4_amount,
              //       response.data.customer[0].pastdue_bucket5_amount,
              //       response.data.customer[0].pastdue_bucket6_amount,
              //     ],
              //     bucketNames: response.data.bucketNames,
              //     totalCustomerCount: response.data.total,
              //   },
              // ];
            }
            console.log(data);
            dispatch({
              type: "R_RESULT",
              payload: data,
            });
          },
          () => {
            dispatch(rError());
          }
        );
    }
  }, 1000);
  //   axios
  //     .post(
  //       `http://localhost:4000/getUpcomingSummary.do?pageNumber=${num}&pageSize=${page}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       ans = [...ans, res.data];
  //       dispatch({ type: "R_RESULT", payload: ans });
  //     });
};

export default fetchResult;
