import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article{
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query{
        getListArticle(
            sortKey: String,
            sortValue: Int,
            currentPage: Int,
            limitPage: Int,
            filterKey: String,
            filterValue: String,
            keyword: String
        ): [Article],
        getArticle(idArticle: ID): Article,
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
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: ArticleInput): Article,
    }
`;