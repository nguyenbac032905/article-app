import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article{
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Query{
        hello: String,
        getListArticle: [Article],
        getArticle(idArticle: ID): Article
    }

    input ArticleInput {
        title: String,
        avatar: String,
        description: String,
        deleted: Boolean,
        categoryId: String
    }

    type Mutation{
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID): String
    }
`;