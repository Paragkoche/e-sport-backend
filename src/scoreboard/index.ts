import { Router } from "express"
import { prisma } from ".."
import { ScoreBoard } from ".prisma/client"
import { config } from "dotenv"
import jwt from "jsonwebtoken"
const routes = Router()
config()
const key: any = process.env.key

routes.post('/add', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        const id: any = jwt.verify(token.split(" ")[1], key)
        prisma.orgnaser.findFirst({ where: { id: id.id } }).then((e) => {
            if (e) {

                const data: ScoreBoard | any = req.body
                prisma.scoreBoard.create({
                    data: {
                        ...data, Turnament: {
                            connectOrCreate: {
                                create: {
                                    ...data.t
                                }, where: { name: data.t.name }
                            }
                        }
                    }
                }).then((sb) => {
                    res.json(sb)
                })
            }
        })
    }
})

routes.get('/:id', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        const id: any = jwt.verify(token.split(" ")[1], key)
        prisma.orgnaser.findFirst({ where: { id: id.id } }).then((e) => {
            if (e) {
                prisma.scoreBoard.findFirst({ where: { id: req.params.id } }).then((sb) => {
                    res.json(sb)
                })
            }
        })
    }
})
routes.put('/update/:id', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        const id: any = jwt.verify(token.split(" ")[1], key)
        prisma.orgnaser.findFirst({ where: { id: id.id } }).then((e) => {
            if (e) {
                const data: ScoreBoard = req.body
                prisma.scoreBoard.update({ where: { id: req.params.id }, data: data }).then((sb) => {
                    res.json(sb)
                })
            }
        })
    }
})
export default routes