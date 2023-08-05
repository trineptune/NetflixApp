var admin = require("firebase-admin");
var firebase = require("firebase/auth");
var init = require("firebase/app")
var serviceAccount = require("./serviceAccountKey.json");
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
const db = admin.firestore()

var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')
var app = express();
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5555,function(){
    console.log("Server is running....");
})

app.post('/api/movies',async(req,res) =>{
    const {name,linkVideo, description, image, tags} = req.body;
    const ref = db.collection('Movies').doc()
    const item = {
        name: name,
        linkVIdeo : linkVideo,
        description : description,
        image: image,
        tags: tags
    }
    try{
        ref.set(item).then((snapshot)=>{
            res.status(201).send({
                status:'success'

            })
    }
    catch(error){
        res.status(500).send({message: error})
    }   
    
})