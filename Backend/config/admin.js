var admin = require("firebase-admin");
var firebase = require("firebase/auth");
var init = require("firebase/app")
var serviceAccount = require("../serviceAccountKey.json");
var firestore = require("firebase/firestore")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firebaseConfig = {
  apiKey: "AIzaSyBBhyz9QxnKwwVb1-uAsGgKT-BAp4ZplAM",
  authDomain: "apituan8.firebaseapp.com",
  projectId: "apituan8",
  storageBucket: "apituan8.appspot.com",
  messagingSenderId: "801465630987",
  appId: "1:801465630987:web:e9067f0f53459acc46a20e",
  measurementId: "G-VG93699XCV"
};
const appp = init.initializeApp(firebaseConfig);
const auth = firebase.getAuth(appp)
const db = firestore.getFirestore(appp)

module.exports={db}
module.exports={auth}