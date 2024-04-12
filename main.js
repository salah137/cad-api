const express = require("express")
const auth = require('./auth')
const database = require("./database")
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');

require("dotenv").config()

app.use(cors());
app.use(express.json());


app.use("/annonce", (req, res, next) => {
    const authHeader = req.header('authorization');
    console.log(authHeader);
    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(authHeader, (process.env.TOKEN_SECRET), (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);
 
        req.user = user; 

        next(); 
    });
})

app.use("/tutorial", (req, res, next) => {
    const authHeader = req.header('authorization');
    console.log(authHeader);
    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(authHeader, (process.env.TOKEN_SECRET), (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user; 

        next();
    });  
})

app.post("/signUp", async (req, res) => {
    console.log("hiii");
    console.log(req.body.name);
    res.json( 
        await auth.signUp( 
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.cellule,
            req.body.userType
        )
    )
})

app.post("/signIn", async (req, res) => {
    res.json(
        await auth.signIn(
            req.body.email,
            req.body.password,
        )
    )
})
 
app.get("/annonce/getAnnonce", async (req, res) => {
    res.json(
        await database.getAnnonce()
    )
})

app.post("/annonce/addAnnonce", async (req, res) => {
    res.json(
        await database.addAnnonce(
            req.body.title,
            req.body.description,
            req.body.files,
            Number(req.body.authorId)
        )
    )
})

app.patch("/annonce/updateAnnonce", async (req, res) => {
    res.json( 
        await database.updateAnnonce(
            req.body.id,
            req.body.title,
            req.body.description,
            req.body.files
        )
    )
})

app.delete("/annonce/deleteAnnonce", async (req, res) => {
    res.json(
        await database.deleteAnnonce(
            req.body.id
        )
    )
})

app.get("/tutorial/getTutorials", async (req, res) => {
    res.json(
        await database.getTutorials(
            req.body.topic
        )
    )
})

app.get("/tutorial/getTUtorial", async (req, res) => {
    res.json(
        await database.getTutorial(
            req.body.id
        )
    )
})

app.get("/tutorial/addTutorial", async (req, res) => {
    res.json(
        await database.addTutorial(
            req.body.title,
            req.body.topic, 
            req.body.description, 
            req.body.image
        )
    )
})

app.post("/tutorial/addTutorialElement",async(req,res)=>{
    res.json(
        await database.addTutorialElement(
            req.body.tutorialId, req.body.title, req.body.description, req.body.files
        )
    )
})

app.patch("/tutorial/updateTutorialElement",async(req,res)=>{
    res.json(
        database.updateTutorialElement(
            req.body.id, req.body.title, req.body.description, req.body.files
        )
    )
})

app.delete("/tutorial/deleteTutorialElement",async(req,res)=>{
    res.json(
        await database.deleteTutorialElement(req.body.id)
    )
})

app.listen(
    5000,
    () => {
        console.log(`server running in http://localhost:${5000}`);
    }
)