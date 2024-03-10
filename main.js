const express = require("express")
const auth = require('./auth')
const database = require("./database")
const app = express()

app.post("/signUp", async (req, res) => {
    res.json(
        await auth.signUp(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.profile
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

app.get("/getAnnonce", async (req, res) => {
    res.json(
        await database.getAnnonce()
    )
})

app.post("/addAnnonce", async (req, res) => {
    res.json(
        await database.addAnnonce(
            req.body.title,
            req.body.description,
            req.body.files,
            req.body.authorId
        )
    )
})

app.patch("/updateAnnonce", async (req, res) => {
    res.json(
        await database.updateAnnonce(
            req.body.id,
            req.body.title,
            req.body.description,
            req.body.files
        )
    )
})

app.delete("/deleteAnnonce", async (req, res) => {
    res.json(
        await database.deleteAnnonce(
            req.body.id
        )
    )
})

app.get("/getTutorials", async (req, res) => {
    res.json(
        await database.getTutorials(
            req.body.topic
        )
    )
})

app.get("/getTUtorial", async (req, res) => {
    res.json(
        await database.getTutorial(
            req.body.id
        )
    )
})

app.get("/addTutorial", async (req, res) => {
    res.json(
        await database.addTutorial(
            req.body.title,
            req.body.topic, 
            req.body.description, 
            req.body.image
        )
    )
})

app.post("/addTutorialElement",async(req,res)=>{
    res.json(
        await database.addTutorialElement(
            req.body.tutorialId, req.body.title, req.body.description, req.body.files
        )
    )
})

app.patch("/updateTutorialElement",async(req,res)=>{
    res.json(
        database.updateTutorialElement(
            req.body.id, req.body.title, req.body.description, req.body.files
        )
    )
})

app.delete("/deleteTutorialElement",async(req,res)=>{
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