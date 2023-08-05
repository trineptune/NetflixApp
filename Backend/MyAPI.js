
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

const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

app.get('/api/movies', async(req,res) => {
    try{
        const movieRef = db.collection('Movies')
        movieRef.get().then((snapshot) =>{
            const items = snapshot.docs.map((doc) =>(
                {
                    id:doc.id,
                    ...doc.data()
                }
            ))
            res.status(201).json(items);
        })
    }
    catch(error)
    {
        res.status(500).json({message: error})
    }
})

//get user
app.get("/api/user/:id", async(req,res)=>{
    var id = req.params.id;
    const courseRef = db.collection('users').doc(id)

    try{
        courseRef.get().then((snapshot) => {
            const items =
                {
                    id:snapshot.id,
                    ...snapshot.data()
                }
            res.status(201).json(items);
        })
    }
    catch(error){
        res.status(500).json({message: error});
    }
    // return res.status(201).json(items);
})

//get movie details
app.get('/api/movies/:id', async(req,res) => {
    var id = req.params.id;
    const ref = db.collection('Movies').doc(id)
    try{
        ref.get().then((snapshot) =>{
            const item = {
                id : snapshot.id,
                ...snapshot.data()
            }
            res.status(201).json(item)
        })
    }
    catch(error){
        res.status(500).json({message: error})
    }
})
//dang ky
app.post('/api/user', async(req,res) => {
    const {firstName, lastName, email, password, timeExpired} = req.body;
    
    const item = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        timeExpired : timeExpired,
    }
    createUserWithEmailAndPassword(auth,email,password).then(() => {
        db.collection('users').doc(email).set(item).then( ()=> {
            console.log('here')
            res.status(201).json(item);
        }).catch(error => {
            res.status(501).json(error)
        })
        })
})

app.post('/api/user/login/',async(req,res) => {
    const {email, password} = req.body;
    signInWithEmailAndPassword(auth,email,password).then(() => {
        const courseRef = db.collection('users').doc(email)
        try{
        courseRef.get().then((snapshot) => {
            const items =
                {
                    id:snapshot.id,
                    ...snapshot.data()
                }
            res.status(201).json(items);
        })
    }
    catch(error){
        res.status(500).json({message: error});
    }
        }).catch(err => {
            res.status(500).json(err);
        })
        
})

//get list movie from user
app.get('/api/user/mylist/:id',async(req,res) => {
    var id = req.params.id
    const ref = db.collection('users').doc(id).collection('myList')
    try{
        ref.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) =>(
                {
                    id:doc.id,
                    ...doc.data()
                }
            ))
            res.status(201).json(items);
        })
    }
    catch(error){
        res.status(500).json({message: error});
    }
})

app.put('/api/user/:id',async(req,res) => {
    var id = req.params.id
    const ref = db.collection('users').doc(id)

        ref.update({
            timeExpired:7
        }).then(()=>{
            res.status(201).json({message: 'successfully'});
        }).catch((err)=>{
            res.status(500).json({message: err})
        })
        

})
