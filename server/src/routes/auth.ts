import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function authRoutes(app:FastifyInstance) {
    app.post("/auth", async (req) => {
        const schema = z.object({
            code: z.string()
        })

        const {code} = schema.parse(req.body)   
        return code
    })
}