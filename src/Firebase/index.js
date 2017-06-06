import firebase from 'firebase'  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANtxGKGUOri82WTBtkEEWf0lmFSUwx1eM",
    authDomain: "vision-2-d2ab1.firebaseapp.com",
    databaseURL: "https://vision-2-d2ab1.firebaseio.com",
    projectId: "vision-2-d2ab1",
    storageBucket: "vision-2-d2ab1.appspot.com",
    messagingSenderId: "903144066527"
  };
  firebase.initializeApp(config);

export default firebase

export const REF = {
  Node: '/concepts',
  Link: '/edges',
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