import * as firebase from "firebase/app"
import firebaseConfig from "./firebase-config";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig.firebaseConfig);
export default  firebase;