import fastify from "fastify"
import Cors from "@fastify/cors"
import { TodoRoutes } from "./routes/todo"
import { authRoutes } from "./routes/auth"

const app = fastify({
    logger: true
})


app.register(Cors, {
    origin: true
})

app.listen({
    port: 3333
}).then(()=> "http://localhost:3333")   


app.register(TodoRoutes)
app.register(authRoutes)