const express = require('express')
const http = require('http')
const socket = require('socket.io')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const app = express()
    const server = http.Server(app)
    const io = socket(server)

    app.get("/test", (req, res) => {
        io.emit("vote", 1)
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