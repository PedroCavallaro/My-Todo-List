import { FastifyInstance } from "fastify";
import { z } from "zod"
import axios from "axios"
import { prisma } from "../lib/prisma";


export async function authRoutes(app:FastifyInstance) {
    app.post("/auth", async (req, reply) => {
        const schema = z.object({
            code: z.string()
        })

        const {code} = schema.parse(req.body)   
        try{
           const response = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",{
                    headers:{
                        "Authorization": `Bearer ${ code }`
                    }
                })
            const responseSchema = z.object({
                name: z.string(),
                picture: z.string(),
                email: z.string().email(),
                sub: z.string()
            })

            const userInfo = responseSchema.parse(response.data)
            const {name, picture, email, sub } = userInfo

            let user = await prisma.user.findUnique({
                where:{
                    sub
                }
            })

            if(!user){
                user = await prisma.user.create({
                    data:{
                        name,
                        picture,
                        email,
                        sub
                    }
                })
            }

        const token = app.jwt.sign({
            name: user.name,
            picture: user.picture
        }, {
            sub: user.id,
            expiresIn: "30 days"
        })

        return token
        
        }
        catch(err){
            return reply.status(404).send()
        }
    })
}
