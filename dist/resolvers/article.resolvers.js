"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversArticle = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const categories_model_1 = __importDefault(require("../models/categories.model"));
exports.resolversArticle = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitPage, filterKey, filterValue, keyword } = args;
            const find = {
                deleted: false
            };
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const objectPagi = {
                currentPage: 1,
                limitPage: 2,
            };
            if (currentPage && limitPage) {
                objectPagi.currentPage = currentPage;
                objectPagi.limitPage = limitPage;
            }
            objectPagi["skipItem"] = (objectPagi.currentPage - 1) * objectPagi.limitPage;
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            const regex = new RegExp(keyword, "i");
            find["title"] = regex;
            const article = yield article_model_1.default.find(find).sort(sort).skip(objectPagi["skipItem"]).limit(objectPagi.limitPage);
            return article;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { idArticle } = args;
            const article = yield article_model_1.default.findOne({ deleted: false, _id: idArticle });
            return article;
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield categories_model_1.default.findOne({ _id: categoryId });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({ _id: id }, { $set: { deleted: true } });
            return "Da xoa";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({ _id: id }, article);
            const record = yield article_model_1.default.findOne({ _id: id });
            return record;
        })
    }
};
