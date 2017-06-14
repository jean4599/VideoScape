import firebase from 'firebase'  

 // Initialize Firebase
  //AWG
 var config = {
    apiKey: "AIzaSyB4sv77BJCJMgeVBNBhaObSeE0niTXcvD0",
    authDomain: "vision-linkphrase-awg.firebaseapp.com",
    databaseURL: "https://vision-linkphrase-awg.firebaseio.com",
    projectId: "vision-linkphrase-awg",
    storageBucket: "vision-linkphrase-awg.appspot.com",
    messagingSenderId: "971148822809"
  };
  firebase.initializeApp(config);

export default firebase

export const REF = {
  Node: '/result/Jane/nodes',
  Link: '/result/Jane/edges',
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