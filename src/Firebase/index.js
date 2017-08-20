import firebase from 'firebase'  

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBHDQZBVBpXTHp0S0oJN-XS0Qj_pWdmrSw",
    authDomain: "videoscape-b857c.firebaseapp.com",
    databaseURL: "https://videoscape-b857c.firebaseio.com",
    projectId: "videoscape-b857c",
    storageBucket: "videoscape-b857c.appspot.com",
    messagingSenderId: "719154567638"
  };
  firebase.initializeApp(config);

export default firebase

export const REF = (course, uid)=>{
  return ({
    VIDEO: '/_courses/'+course+'/_video',
    STAGE: '/_courses/'+course+'/stage',
    STAGE1:{
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE1/_concepts/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE1/_user_saved_concepts/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE1/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1/_user_rate/'+uid,
    },
    STAGE2:{
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE2/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE2/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE2/_server_result/',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1/_user_rate/'+uid,
    },
    STAGE3:{
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE3/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE3/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE3/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1/_user_rate/'+uid,
    },
  })
  
}
