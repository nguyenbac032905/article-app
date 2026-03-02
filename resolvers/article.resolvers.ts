import Article from "../models/article.model";
import Category from "../models/categories.model";

export const resolversArticle = {
    Query: {
        getListArticle: async () => {
            const article = await Article.find({deleted: false});
            return article;
        },
        getArticle: async (_,args) => {
            const {idArticle} = args;
            const article = await Article.findOne({deleted: false, _id: idArticle});
            return article
        },
    },
    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({_id: categoryId});
            return category;
        }
    },
    Mutation: {
        createArticle: async (_, args) => {
            const {article} = args;
            const record = new Article(article);
            await record.save();

            return record;
        },
        deleteArticle: async (_, args) => {
            const {id} = args;
            await Article.updateOne({_id: id},{$set: {deleted: true}});

            return "Da xoa"
        },
        updateArticle: async (_, args) => {
            const {id, article} = args;

            await Article.updateOne({_id: id}, article);

            const record = await Article.findOne({_id: id})

            return record;
        }
    }
};