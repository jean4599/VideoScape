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

export const REF = {
  Node: '/Data/nodes',
  Link: '/Data/edges',
  Video: '/video',
}

export const saveNode = (node)=>{
  if(node.level===undefined)node.level=null;
  if(node.time===undefined)node.time=null;
  firebase.database().ref(REF.Node).push({
    id: node.id,
    label: node.label,
    level: node.level,
    time: node.time,
  })
}

export const saveLink = (link)=>{
  console.log('Firebase save link:')
  console.log(link)
  firebase.database().ref(REF.Link).push({
    from: link.from,
    to: link.to,
  })
}