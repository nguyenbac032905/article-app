import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
})

const Category = mongoose.model("Category", categoriesSchema, "categories");
export default Category;