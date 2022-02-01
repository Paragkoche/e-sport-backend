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
                prisma.user.findMany({ where: { id: req.params.id } }).then((e) => {

                    res.json(e[0])
                })
            }

        } else {
            res.json({ "user": "you not login" })
        }

        // res.json({ "token": req.headers.authorization })
    })
    routes.get('/usename/:username', (req, res) => {
        if (req.headers.authorization) {
            if (jwt.verify(req.headers.authorization.split(" ")[1], ss)) {
                prisma.user.findMany({ where: { username: { startsWith: req.params.username } } }).then((e) => {

                    res.json(e)
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


}
export default routes