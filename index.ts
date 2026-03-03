import express,{Express, Response, Request} from "express";
import * as database from "./config/database";
import dotenv  from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import {ApolloServerPluginLandingPageLocalDefault,} from "apollo-server-core";
import { typeDefs } from "./typedefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
    dotenv.config();
    database.connect();

    const app: Express = express();
    const port: number | string = process.env.PORT;

    //GraphQL
    app.use("/graphql",requireAuth);

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        context: ({req}) => { return {...req} },
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
}

startServer();
