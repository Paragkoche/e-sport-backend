import { prisma, app } from ".."
import { Router } from "express"
import { config } from "dotenv"
import jwt from "jsonwebtoken"
import { videos } from "@prisma/client"
import { base64_decode, base64_encode } from "../lib"
import fs from "fs"
import path from "path"

config()
const routes = Router()

const key: any = process.env.key
routes.post('/', (req, res) => {
    console.log(req.body);
    res.json({ "": "ok" })

})
routes.post("/add", (req, res) => {
    const token = req.headers.authorization
    const data: videos = req.body
    if (token) {
        const { id }: any = jwt.verify(token.split(" ")[1], key)
        prisma.user.findUnique({ where: { id: id } }).then((user) => {
            if (user) {
                try {
                    const date = Date.now()
                    fs.mkdir(path.join('.', `/cdn/${user.username}/${date}/`), { recursive: true }, (e, k) => { })
                    const video: any = base64_decode(data.video, `./cdn/${user.username}/${date}/${data.title}.mp4`)
                    console.log(video);

                    if (user.isGammer) {
                        prisma.videos.create({
                            data: {
                                ...data, video,
                                User: {
                                    connect: {
                                        id: user.id
                                    }
                                }
                            },

                        }).then((e) => {
                            res.json(e)
                        })
                    }

                } catch (e) {
                    const video: any = base64_decode(data.video, `./cdn/${user.username}/${Date.now().toString()}/${data.title}.mp4`)
                    if (user.isGammer) {
                        prisma.videos.create({
                            data: {
                                ...data, video: video,
                                User: {
                                    connect: {
                                        id: user.id
                                    }
                                }
                            },

                        }).then((e) => {
                            res.json(e)
                        })
                    }
                }
            }
        })
    }
})


routes.get("/:id", (req, res) => {
    prisma.videos.findUnique({ where: { id: req.params.id } }).then((e) => {
        if (e) {
            const paths = path.join(e.video)
            var stat = fs.statSync(path.join(e.video));
            console.log(stat);

            var total = stat.size;
            console.log(req.headers.range);

            if (req.headers.range) {



                var range = req.headers.range;
                var parts = range.replace(/bytes=/, "").split("-");
                var partialstart = parts[0];
                var partialend = parts[1];

                var start = parseInt(partialstart, 10);
                var end = partialend ? parseInt(partialend, 10) : total - 1;
                var chunksize = (end - start) + 1;

                var file = fs.createReadStream(paths, { start: start, end: end });
                res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
                file.pipe(res);

            } else {
                res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
                fs.createReadStream(paths).pipe(res);
            }
        }
    })
})
export default routes