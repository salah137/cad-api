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
    console.log(            req.query.id
    );
    res.json(
        await database.deleteAnnonce(
            req.query.id
        )
    )
})

app.get("/tutorial/getTutorials", async (req, res) => {
    console.log(req.query.topic);
    console.log(await database.getTutorials(
        req.query.topic
    ));
    res.json(
        await database.getTutorials(
            req.query.topic
        )
    )
})

app.get("/tutorial/getTutorial", async (req, res) => {
    res.json(
        await database.getTutorial(
            Number(req.query.id)
        )
    )
})

app.post("/tutorial/addTutorial", async (req, res) => {
    console.log('dpdmd');
    res.json(
        await database.addTutorial(
            req.body.title,
            req.body.topic,
            req.body.image,
            req.body.description,
        )
    )
})

app.get('/tutorial/getTutorialElement',async (req,res)=>{
    console.log("hi");
    res.json(
        await database.getTutorialElement(Number(req.query.id))
    )
})

app.post("/tutorial/addTutorialElement", async (req, res) => {
    res.json(
        await database.addTutorialElement(
            req.body.tutorialId, 
            req.body.title, 
            req.body.description, 
            req.body.video,
            req.body.image,
            req.body.files,
        )
    )
})
 
app.patch("/tutorial/updateTutorialElement", async (req, res) => {
    res.json(
        database.updateTutorialElement(
            req.body.id, req.body.title, req.body.description, req.body.files
        )
    )
})

app.delete("/tutorial/deleteTutorialElement", async (req, res) => {
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