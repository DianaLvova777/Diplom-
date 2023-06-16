import firebase from "firebase/app";
import "firebase/database";
import { ErrorTest } from "./errors.service";


export const addRealTimeData = ({ path, data }) => {
  return new Promise((resolve, reject) => {
    const key = firebase.database().ref().child(path).push().key;
    let setData = {};
    data.id = key;
    setData[`/${path}/${key}`] = data;

    firebase.database().ref().update(setData)
      .then(msg => resolve(msg))
      .catch(err => reject(err));
  });
};

export const getRealtimeData = ({ path, id = "" }) => {
  return new Promise((resolve, reject) => {
    const tests = [
      {
        name: "path",
        type: "string",
        check: path
      }
    ]
    const errorTest = new ErrorTest(tests);
    const stateErr = errorTest.checkTypeData();
    const found = errorTest.checkNotFound();
    let posts = "Записей нет";

    if (stateErr.success) {
      alert(stateErr.message);
      reject(stateErr);
      return;
    }

    if (found.success) {
      alert(found.message);
      reject(found);
      return;
    }
    firebase.database().ref(`/${path}/${id}`).on('value', snapshot => {
      posts = (snapshot.val() && snapshot.val()) || 'Записей нет'

      if (typeof posts !== "string") {
        resolve(posts);
      } else {
        reject(posts);
      }
    });
  });
};

export const getOnceData = ({ path, id = "" }) => {
  return new Promise((resolve, reject) => {
    const tests = [
      {
        name: "path",
        type: "string",
        check: path
      }
    ]
    const errorTest = new ErrorTest(tests);
    const stateErr = errorTest.checkTypeData();
    const found = errorTest.checkNotFound();
    if (stateErr.success) {
      alert(stateErr.message);
      reject(stateErr);
      return;
    }
    if (found.success) {
      alert(found.message);
      reject(found);
      return;
    }

    firebase.database().ref(`/${path}/${id}`).once('value')
      .then(snapshot => {
        var posts = (snapshot.val() && snapshot.val()) || 'Новостей нет';
        if (typeof posts !== "string") {
          resolve(posts);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const removeData = ({ path, id = "" }) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`/${path}/${id}`).remove()
    .then(res => {
      console.log(res);
      resolve(res);
    })
    .catch(err => {
      reject(err);
      console.log(err);
    });
  });
}