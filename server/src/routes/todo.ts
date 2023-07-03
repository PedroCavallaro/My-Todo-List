import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"

export async function TodoRoutes(app: FastifyInstance){
    app.get("/todos/:id", async (req)=>{
        const schema = z.object({
            id: z.string().uuid()
        }) 
    
        const { id } = schema.parse(req.params)

        const toDos = await prisma.toDo.findMany({
            where:{
                userId: id
            },
            select:{
                description:true,
                todoStatus:{
                    select:{
                        description: true
                    }
                }
            }
        })
        return toDos
    })
    app.post("/todos",async (req) => {
        const schema = z.object({
            id: z.string().uuid(),
            description: z.string()
        })

        const {id, description} = schema.parse(req.body)

        const newTodo = await prisma.toDo.create({
            data:{
                description,
                userId: id,
                statusId: "4e7b0462-c58a-472d-98b2-5467c53a2420"
            }
        })

        return newTodo
    })
}