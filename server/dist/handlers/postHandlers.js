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
exports.PostHandler = void 0;
const shared_1 = require("@proghub/shared");
const crypto_1 = __importDefault(require("crypto"));
class PostHandler {
    constructor(db) {
        this.list = (_, res) => __awaiter(this, void 0, void 0, function* () {
            // TODO: add pagination and filtering
            const userId = res.locals.userId;
            return res.send({ posts: yield this.db.listPosts(userId) });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // TODO: better error messages
            if (!req.body.title || !req.body.url) {
                return res.sendStatus(400);
            }
            const existing = yield this.db.getPostByUrl(req.body.url);
            if (existing) {
                // A post with this url already exists
                return res.status(400).send({ error: shared_1.ERRORS.DUPLICATE_URL });
            }
            const post = {
                id: crypto_1.default.randomUUID(),
                postedAt: Date.now(),
                title: req.body.title,
                url: req.body.url,
                userId: res.locals.userId,
            };
            yield this.db.createPost(post);
            return res.sendStatus(200);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.postId)
                return res.sendStatus(400);
            this.db.deletePost(req.body.postId);
            return res.sendStatus(200);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id)
                return res.sendStatus(400);
            const postToReturn = yield this.db.getPost(req.params.id, res.locals.userId);
            if (!postToReturn) {
                return res.sendStatus(404);
            }
            return res.send({ post: postToReturn });
        });
        this.db = db;
    }
}
exports.PostHandler = PostHandler;
//# sourceMappingURL=postHandlers.js.map