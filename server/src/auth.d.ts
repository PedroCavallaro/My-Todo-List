import "@fastify/jwt"

declare module "@fastify/jwt"  {
    export interface FastifyJWT{
        user: {
            name: string,
            picture: string,
            sub: string
        }
    }
}