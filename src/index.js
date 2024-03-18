import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import indexRouter from './routes/indexRouter.js'
import { Server } from 'socket.io'
import { __dirname } from './path.js'

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(cookieParser("claveSecreta"))
app.use(session({
    secret: "coderSecret",
    resave: true,
    saveUninitialized: true
}))
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// Routes
app.use('/', indexRouter)

// Server
const server = app.listen(PORT, () => {
    console.log(`Estoy corriendo en el puerto: ${PORT}`)
})

// Socket.io setup
const io = new Server(server)
io.on('connection', (socket) => {
    console.log("Socket.io connection established")
    
})


//Connection DB
mongoose.connect("mongodb+srv://ripanipk1:***coderhouse@cluster0.tusar1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("SI!!!, me conecte al Atlas"))
    .catch(e => console.log(e))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('OOPS, Algo Fallo!')
})

export default app
