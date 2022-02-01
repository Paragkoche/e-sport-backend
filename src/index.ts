import { PrismaClient } from '@prisma/client'
import user from "./user"
import game from "./game"
import scroeboard from "./scoreboard"
import Team from "./Team"
import Turnament from "./Turnament"

export const prisma = new PrismaClient()
import express, { Response } from "express"
import helmat from "helmet"
const app = express()

app.use(express.json({ limit: '10pb' }))
app.use(helmat())
app.use('/user', user)
app.use('/game', game)
app.use('/scroeboard', scroeboard)
app.use('/Team', Team)
app.use('/Turnament', Turnament)

app.listen(8080, () => {
    console.log("http://localhost:8080/");

})