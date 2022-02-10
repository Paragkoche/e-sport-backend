import { Router } from "express"
import { prisma } from ".."
import jwt from "jsonwebtoken"
import env from "dotenv"
import { Game, screenshot } from "@prisma/client"
const routes = Router()
env.config()
const key: any = process.env.key
routes.post('/add', (req, res) => {
    const data = req.body
    console.log(
        data
    );

    prisma.game.create({
        data: {
            ...data,

        },
    }).then((e) => {
        res.json(e)
    })
})
routes.post('/add/ss', (req, res) => {
    const data: screenshot = req.body
    prisma.screenshot.create({
        data: {
            ...data,

        },
    }).then((e) => {
        res.json(e)
    })
})
routes.post('/add/by/addmin', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        // console.log(key);
        const id: any = jwt.verify(token.split(" ")[1], key)

        if (id) {
            prisma.user.findFirst({ where: { id: id.id } }).then((user) => {
                if (user) {
                    if (user.isGammer) {
                        const body: any = req.body
                        console.log(req.body);


                        prisma.user.update({
                            where: { id: id.id }, data: {
                                games: {
                                    connectOrCreate: {
                                        create: {
                                            ...body
                                        },
                                        where: {
                                            game_name: body.game_name
                                        }
                                    }
                                }
                            },
                            include: {
                                games: true
                            }

                        }).then((e) => {
                            res.json(e)
                        }).catch((e) => {
                            console.log(e);

                            res.json(e)
                        })
                    }
                }
            })
        }

    }
})
routes.get('/:id', (req, res) => {
    prisma.game.findFirst({ where: { id: req.params.id } }).then((games) => {
        if (games) {
            res.json(games)
        } else {
            res.json({ "error": "game not found" })
        }
    })

})
routes.put("/:id", (req, res) => {
    const token = req.headers.authorization
    if (token) {
        const id: any = jwt.verify(token.split(" ")[1], key)
        prisma.user.findFirst({ where: { id: id.id }, }).then((user) => {
            if (user) {
                prisma.game.findFirst({
                    where: {
                        id: req.params.id
                    }, include: {
                        User: {
                            select: {
                                id: true
                            }
                        }
                    }
                }).then((games) => {
                    if (games) {
                        games.User.map((v, i) => {
                            if (v.id === id.id) {
                                prisma.game.delete({ where: { id: games.id } }).then((e) => {

                                    return res.json(e)
                                })
                            }
                        })
                    }
                })

            }
        })


    } else {
        res.json({ "error": "autho error" })
    }
})
routes.get('/name/:game_name', (req, res) => {
    prisma.game.findMany({
        where: {
            game_name: {
                startsWith: req.params.game_name,
                mode: 'insensitive'
            },

        },
        include: {
            User: {
                select: {
                    id: true
                }
            }
        }
    }).then((games) => {
        res.json(games)
    })
})
export default routes