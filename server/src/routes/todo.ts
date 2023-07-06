import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"

export async function TodoRoutes(app: FastifyInstance){
    app.addHook("preHandler", async (req)=> {
            await req.jwtVerify()
    })

    app.get("/todos", async (req)=>{

        const user = await prisma.user.findUnique({
            where:{
                id: req.user.sub
            }
        })
      
        const toDos = await prisma.toDo.findMany({
            where:{
                userId: user?.id,
            },
            select:{
                id:true,
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
            description: z.string()
        })

        const { description } = schema.parse(req.body)
        const user = await prisma.user.findUnique({
            where:{
                id: req.user.sub
            }
        })
      
        const newTodo = await prisma.toDo.create({
            data:{
                description,
                userId: user!.id,
                statusId: "86d66a26-cb64-4cb6-8167-0cfe7efc2d14"
            }
        })

        return newTodo
    })
    app.put("/todo/:id", async (req)=>{
        const schema = z.object({
            userId: z.string().uuid(),
            descripition: z.string(),
            statusId: z.string()
        })
    })
}