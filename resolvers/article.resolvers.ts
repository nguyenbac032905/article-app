import Article from "../models/article.model";
import Category from "../models/categories.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_,args) => {
            const {sortKey,sortValue,currentPage,limitPage, filterKey,filterValue,keyword} = args;
            const find = {
                deleted: false
            }
            //sort
            const sort = {};
            if(sortKey && sortValue){
                sort[sortKey] = sortValue;
            }
            //pagination
            const objectPagi = {
                currentPage: 1,
                limitPage: 2,
            }

            if(currentPage && limitPage){
                objectPagi.currentPage = currentPage;
                objectPagi.limitPage = limitPage;
            }

            objectPagi["skipItem"] = (objectPagi.currentPage-1)* objectPagi.limitPage;
            //filter
            if(filterKey && filterValue){
                find[filterKey] = filterValue;
            }
            //search
            const regex = new RegExp(keyword, "i");
            find["title"] = regex;
            
            const article = await Article.find(find).sort(sort).skip(objectPagi["skipItem"]).limit(objectPagi.limitPage);
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