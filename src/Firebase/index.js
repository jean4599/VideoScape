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

export const DATAREF=(course, uid, stage)=>{
  var ref=null;
  switch(stage){
    case '1_1': ref = {
      INITIAL_DATA: '',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE1_1/_concepts/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE1_1/_user_saved_concepts/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE1_1/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1_1/_user_rate/'+uid,
      INSTRUCTION: '/_instruction/STAGE1_1',
    }
    break;
    case '1_2': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE1_1/_server_result',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE1_2/_concepts/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE1_2/_user_saved_concepts/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE1_2/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1_2/_user_rate/'+uid,
      INSTRUCTION: '/_instruction/STAGE1_2',
    }
    break;
    case '1_3': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE1_2/_server_result',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE1_3/_concepts/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE1_3/_user_saved_concepts/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE1_3/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE1_3/_user_rate/'+uid,
      INSTRUCTION: '/_instruction/STAGE1_3',
    }
    break;
    case '2_1': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE1_3/_server_result',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE2_1/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE2_1/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE2_1/_server_result/',
      INSTRUCTION: '/_instruction/STAGE2_1',
    }
    break;
    case '2_2':ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE2_1/_server_result/',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE2_2/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE2_2/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE2_2/_server_result/',
      INSTRUCTION: '/_instruction/STAGE2_2',
    }
    break;
    case '2_3': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE2_2/_server_result/',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE2_3/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE2_3/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE2_3/_server_result/',
      INSTRUCTION: '/_instruction/STAGE2_3',
    }
    break;
    case '3_1': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE2_3/_server_result/',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE3_1/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE3_1/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE3_1/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE3_1/_user_rate/'+uid,
      INSTRUCTION: '/_instruction/STAGE3_1',
    }
    break;
    case '3_2': ref={
      INITIAL_DATA: '/_courses/'+course+'/STAGE3_1/_server_result',
      REAL_TIME_DATA: '/_courses/'+course+'/STAGE3_2/_graph/'+uid,
      USER_SAVED_DATA: '/_courses/'+course+'/STAGE3_2/_user_saved_graphs/'+uid,
      SERVER_PROCESSED_DATA: '/_courses/'+course+'/STAGE3_2/_server_result',
      USER_RATED_RESULT: '/_courses/'+course+'/STAGE3_2/_user_rate/'+uid,
      INSTRUCTION: '/_instruction/STAGE3_2',
    }
    break;
  }
  return ref;
}
export const REF = (course, uid)=>{
  return ({
    VIDEO: '/_courses/'+course+'/_video',
    STAGE: '/_courses/'+course+'/stage',
  })
  
}
