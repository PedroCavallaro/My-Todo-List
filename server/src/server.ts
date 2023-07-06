import fastify from "fastify"
import Cors from "@fastify/cors"
import { TodoRoutes } from "./routes/todo"
import { authRoutes } from "./routes/auth"
import jwt from "@fastify/jwt"

const app = fastify({
    logger: true
})


app.register(Cors, {
    origin: true
})

app.register(jwt, {
    secret: "asdofh271te17g2e9h12uish1ih29812hs197g821shoiahs12ys"
})
app.register(TodoRoutes)
app.register(authRoutes)

app.listen({
    port: 3333
}).then(()=> "http://localhost:3333")   
