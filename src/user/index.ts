import { Router } from "express"

//data base 
import { prisma } from ".."
//type of User
import { User } from ".prisma/client"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()
const routes = Router()
if (process.env.key) {
    const ss: string = process.env.key
    routes.post('/Ragester', async (req, res) => {
        const data: User = req.body
        // console.log(data, req.body);
        bcrypt.genSalt(256, (error, salt) => {
            if (error) throw error
            bcrypt.hash(data.password, salt, (error, passwd) => {
                if (error) throw error


                prisma.user.create({ data: { ...data, password: passwd } }).then((data) => {
                    data.password = ''
                    res.json({ data, "token": jwt.sign({ "id": data.id, isGammer: data.isGammer }, ss, { expiresIn: "30 days" }) })
                }).catch((e) => {
                    console.log(e);

                    res.send(e.code)

                })

            })
        })





    })
    routes.post('/login', (req, res) => {
        const data: User = req.body
        prisma.user.findUnique({ where: { username: data.username } }).then((e) => {
            if (e)
                bcrypt.compare(data.password, e.password, (error, passwd) => {
                    if (error) throw error
                    if (passwd) {
                        e.password = ''

                        res.json({ data: e, "token": jwt.sign({ "id": e.id, isGammer: e.isGammer }, ss, { expiresIn: "30 days" }) })
                    } else {
                        res.status(202).json({ "error": "password is encorret" })
                    }
                })
            else {
                res.status(404).json({ 'error': 'user not found 404' })
            }
        })
    })
    routes.get('/:id', (req, res) => {
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                const d: any = jwt.verify(req.headers.authorization.split(" ")[1], ss)
                prisma.user.findFirst({ where: { id: d.id } }).then((e) => {
                    if (e) {
                        prisma.user.findMany({
                            where: { id: req.params.id },

                            include: {
                                vidos: {
                                    select: {
                                        id: true
                                    }
                                },
                                follower: {
                                    select: {
                                        id: true
                                    }
                                }
                                ,
                                User: {
                                    select: {
                                        id: true
                                    }
                                },
                                games: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        }).then((es) => {
                            es[0].password = ""
                            res.json(es[0])
                        })
                    } else {
                        res.json({ 'erorr': 'erorr autho' })
                    }

                })
            }

        } else {
            res.json({ "user": "you not login" })
        }

        // res.json({ "token": req.headers.authorization })
    })
    routes.get('/username/:username', (req, res) => {
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                const d: any = jwt.verify(req.headers.authorization.split(" ")[1], ss)
                prisma.user.findFirst({ where: { id: d.id } }).then((e) => {
                    if (e) {

                        prisma.user.findMany({

                            where: { username: { startsWith: req.params.username, mode: 'insensitive' } }, select: {

                                "id": true,
                                "username": true,
                                "name": true,
                                "lastname": true,
                                "password": false,
                                "totalIncom": true,
                                "isGammer": true,


                            }
                        }).then((e) => {

                            res.json(e)
                        })
                    } else {
                        res.json({ 'erorr': 'erorr autho' })
                    }

                })
            }

        } else {
            res.json({ "user": "you not login" })
        }

        // res.json({ "token": req.headers.authorization })
    })
    routes.delete('/delete', (req, res) => {
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                const id: any = jwt.verify(req.headers.authorization.split(" ")[1], ss)
                prisma.user.delete({ where: { id: id.id } }).then((e) => {
                    console.log(e);
                    // re
                    res.json(e)
                }).catch(e => {
                    res.json(e)
                })
            }
        }
    })
    routes.put('/follow', (req, res) => {
        const idf = req.body.id
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                const id: any = jwt.verify(req.headers.authorization.split(" ")[1], ss)
                prisma.user.findFirst({ where: { id: id.id } }).then((e) => {
                    if (e) {
                        prisma.user.findFirst({ where: { id: idf } }).then((es) => {
                            if (es) {


                                prisma.user.update({
                                    where: { id: id.id }, data: {
                                        follower: {
                                            connect: {

                                                id: es.id
                                            }
                                        }
                                    },
                                    include: {
                                        follower: {
                                            select: {
                                                id: true
                                            }
                                        }
                                    }
                                }).then((e) => {
                                    res.json(e)
                                })
                            } else {
                                res.json({ "error": "user not found" })
                            }
                        })

                    } else {
                        res.json({ 'erorr': 'erorr autho' })
                    }
                })
            }
        }

    })
    routes.put('/add/game', (req, res) => {
        const { gameId } = req.body
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                const id: any = jwt.verify(req.headers.authorization.split(" ")[1], ss)
                prisma.game.findFirst({ where: { id: gameId } }).then((game) => {
                    if (game) {

                        prisma.user.update({
                            where: { id: id.id },
                            data: {
                                games: {
                                    connect: game
                                }
                            },
                            include: {
                                games: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        }).then((e) => {
                            res.json(e)
                        })
                    } else {
                        res.status(404).json({ "error": "game not found" })
                    }
                })
            }
        }
    })

}
export default routes