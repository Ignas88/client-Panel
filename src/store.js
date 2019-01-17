import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';
//Reducers

const firebaseConfig ={
  apiKey: "AIzaSyA8piHxtKWKMqwEjm8HOWBqooKJT_jjGho",
  authDomain: "clientpanel-15185.firebaseapp.com",
  databaseURL: "https://clientpanel-15185.firebaseio.com",
  projectId: "clientpanel-15185",
  storageBucket: "clientpanel-15185.appspot.com",
  messagingSenderId: "473571579015"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize other services on firebase instance
const firestore = firebase.firestore(); // <- needed if using firestore
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localstorage
if (localStorage.getItem('settings') ==null) {
  //Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //Set to localstorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
