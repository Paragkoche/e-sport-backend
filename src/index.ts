import { PrismaClient } from '@prisma/client'

import user from "./user"
import game from "./game"
import scroeboard from "./scoreboard"
import Team from "./Team"
import Turnament from "./Turnament"
import videos from "./video"
import express from "express"
import helmat from "helmet"
import socketIo from "socket.io"
import http from "http"
import cors from "cors"
export const app = express()

app.use(cors({
    origin: '*'
}))


// app.use(helmat())
app.use(express.json({ limit: '10pb' }))

export const prisma = new PrismaClient()
app.use('/user', user)
app.use('/game', game)
app.use('/scroeboard', scroeboard)
app.use('/Team', Team)
app.use('/Turnament', Turnament)
app.use('/video', videos)

app.listen(8080, () => {
    console.log("http://localhost:8080/");

})