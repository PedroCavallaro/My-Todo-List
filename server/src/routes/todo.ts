import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { string, z } from "zod"

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
    app.put("/todos", async (req)=>{
        const schema = z.object({
            id: z.string().uuid(),
            status: z.string()
        })

        const {id, status} = schema.parse(req.body)
        
        
        const statusInfo = await prisma.toDoStatus.findMany({
            where:{
                description: status
            }
        })
        if(statusInfo){
            const update = await prisma.toDo.update({
                where:{
                    id
                },
                data:{
                    statusId: statusInfo[0].id
                }
         
            })
            return update
        }

    })
    app.delete("/todos", async (req)=> {
        const schema = z.object({
            id: z.string().uuid(),
        })

        const {id} = schema.parse(req.body)

        const deletedToDo = await prisma.toDo.delete({
            where:{
                id
            }
        })

    })
}