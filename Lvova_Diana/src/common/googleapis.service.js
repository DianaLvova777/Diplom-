import axios from "axios";
import cookie from "cookie";

export const getFitnessData = () => {
  const token = cookie.parse(document.cookie).t;
  const body = {
    "aggregateBy": [{
      "dataTypeName": "com.google.step_count.delta",
      "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    }],
    "bucketByTime": { "durationMillis": 86400000 },
    "startTimeMillis": new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
    "endTimeMillis": new Date().getTime() // + 24 * 60 * 60 * 1000
  }
  const axiosconfig = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json;encoding=utf-8"
    }
  };

  return new Promise((resolve, reject) => {
    axios
    .post(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      body,
      axiosconfig
    )
    .then(res => {
      let bucket = res.data.bucket;
      let result = bucket.map(el => {
        let activity = {};
        let date = new Date(Number(el.startTimeMillis)).toLocaleString("ru").split(",")[0];
        let start = new Date(Number(el.startTimeMillis)).toLocaleString("ru");
        let end = new Date(Number(el.endTimeMillis)).toLocaleString("ru");

        activity.date = date;
        activity.start = start;
        activity.end = end;
        activity.intVal = el.dataset[0].point.length ? el.dataset[0].point[0].value[0].intVal : 0;

        return activity;
      });
      

      const userSteps = [{
        name: "Шаги",
        data: result.map(el => el.intVal)
      }];
      const userActivity = result;
      const response = {
        userSteps: userSteps,
        userActivity: userActivity
      }
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
};
