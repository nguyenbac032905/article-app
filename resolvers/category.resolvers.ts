
import Category from "../models/categories.model";

export const resolversCategory = {
    Query: {
        getListCategory: async () => {
            const categories = await Category.find({deleted: false});
            return categories;
        },
        getCategory: async (_,args) => {
            const {id} = args;
            const category = await Category.findOne({deleted: false, _id: id});
            return category
        }
    },
    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({_id: categoryId});
            return category;
        }
    },
    Mutation: {
        createCategory: async (_, args) => {
            const {category} = args;
            const record = new Category(category);
            await record.save();

            return record;
        },
        deleteCategory: async (_, args) => {
            const {id} = args;
            await Category.updateOne({_id: id},{$set: {deleted: true}});

            return "Da xoa"
        },
        updateCategory: async (_, args) => {
            const {id, category} = args;

            await Category.updateOne({_id: id}, category);

            const record = await Category.findOne({_id: id})

            return record;
        },
    }
};