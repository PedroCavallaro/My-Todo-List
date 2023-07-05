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
            
            const { name, picture, email, sub } = response.data

            const user = await prisma.user.create({
                data:{
                    name,
                    picture,
                    email,
                    sub
                }
            })
           
           
            return user
        }
        catch(err){
            return reply.status(404).send()
        }
    })
}
