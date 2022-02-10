import { Router } from "express"
import { prisma } from ".."
import { Team } from ".prisma/client"
import { config } from "dotenv"
import jwt from "jsonwebtoken"
config()
const routes = Router()

const key: any = process.env.key

routes.get("/:id", (req, res) => {
    prisma.team.findFirst({ where: { id: req.params.id } }).then((team) => {
        res.json(team)
    })
})

routes.post("/add", (req, res) => {
    const token: any = req.headers.authorization
    if (token) {
        const { id }: any = jwt.verify(token, key)
        prisma.user.findFirst({ where: { id: id } }).then((user) => {
            if (user) {
                if (user.isGammer) {
                    const data = req.body
                    prisma.team.create({ data: { ...data, mamber: { connect: [...data.user] }, leader: { connect: { id: user.id } } }, include: { leader: { select: { id: true } }, mamber: { select: { id: true } } } }).then((team) => {
                        res.json(team)
                    })
                }
            }
        })

    }
})
routes.put("/update/:id", (req, res) => {
    const token: any = req.headers.authorization
    if (token) {
        const { id }: any = jwt.verify(token, key)
        prisma.user.findFirst({ where: { id: id } }).then((user) => {
            if (user) {
                if (user.isGammer) {
                    prisma.team.update({ where: { id: req.params.id }, data: { mamber: { update: [...req.body.maber] } } }).then((team) => {

                        res.json(team)
                    })
                }
            }
        })
    }
}
)
routes.delete("/:id", (req, res) => {
    const token: any = req.headers.authorization
    if (token) {
        const { id }: any = jwt.verify(token, key)
        prisma.user.findFirst({ where: { id: id } }).then((user) => {
            if (user) {
                if (user.isGammer) {
                    prisma.team.delete({ where: { id: req.params.id } }).then((team) => {

                        res.json(team)
                    })
                }
            }
        })
    }
})

export default routes