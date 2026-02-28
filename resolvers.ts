import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => {
            return "Xin chao the gioi"
        },
        getListArticle: async () => {
            const article = await Article.find({deleted: false});
            return article;
        },
        getArticle: async (_,args) => {
            const {idArticle} = args;
            const article = await Article.findOne({deleted: false, _id: idArticle});
            return article
        }
    },
    Mutation: {
        createArticle: async (_, args) => {
            const {article} = args;
            const record = new Article(article);
            await record.save();
            
            return record;
        }
    }
};