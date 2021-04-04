const express = require('express')
const http = require('http')
const socket = require('socket.io')
const next = require('next')
const QuestionManager = require('./server/QuestionManager')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const app = express()
    const server = http.Server(app)
    const io = socket(server)
    let questionManager = new QuestionManager("", [], true)

    io.on("connection", (socket) => {
        socket.on("question:update", question => {
            questionManager = new QuestionManager(
                question.title,
                question.choices,
                question.isHide
            )
            io.emit("question:new", questionManager.getQuestion())
        })

        socket.on("question:hideToggle", (cb) => {
            questionManager.hideToggle()
            cb(questionManager.getQuestion())
            io.emit("question:new", questionManager.getQuestion())
        })

        socket.on("question:clearVote", () => {
            questionManager.clearVote()
            io.emit("question:new", questionManager.getQuestion())
        })

        socket.emit("question:new", questionManager.getQuestion())
    })

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.post("/vote", (req, res) => {
        let vote = req.body
        questionManager.vote(vote.message, vote.author_name)
        io.emit("question:new", questionManager.getQuestion())
        res.status(200).send()
    })

    app.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})