import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCoJWWQ39tRzMoNarBYkQhSEUr1QOWglpg",
  authDomain: "appcara-cracha.firebaseapp.com",
  databaseURL: "https://appcara-cracha.firebaseio.com",
  projectId: "appcara-cracha",
  storageBucket: "appcara-cracha.appspot.com",
  messagingSenderId: "377871456560",
  appId: "1:377871456560:web:be0f7e68fb3d1e0e3490f5"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//exportar banco
export default firebaseApp.firestore();
