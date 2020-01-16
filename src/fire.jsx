import * as firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCWTVCoOkfEQ2Swd-u5jOhHf_NPCtiou34',
//   authDomain: 'cann-iventory-app.firebaseapp.com',
//   databaseURL: 'https://cann-iventory-app.firebaseio.com',
//   projectId: 'cann-iventory-app',
//   storageBucket: '',
//   messagingSenderId: '1087636884169',
//   appId: '1:1087636884169:web:386706e9c66e9aa5',
// };
// Prod configs

const firebaseConfig = {
  apiKey: 'AIzaSyDZBBQUyUnN1unrAU_CaPuupWpzJSYW29A',
  authDomain: 'cann-inventory-prod.firebaseapp.com',
  databaseURL: 'https://cann-inventory-prod.firebaseio.com',
  projectId: 'cann-inventory-prod',
  storageBucket: 'cann-inventory-prod.appspot.com',
  messagingSenderId: '29542867440',
  appId: '1:29542867440:web:159bb58f5deffc4e5d3d35',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const todosRef = firebase.database().ref();
export default todosRef;
