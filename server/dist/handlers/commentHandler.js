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
exports.CommentHandler = void 0;
const shared_1 = require("@proghub/shared");
const crypto_1 = __importDefault(require("crypto"));
class CommentHandler {
    constructor(db) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId)
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            if (!req.body.comment)
                return res.status(400).send({ error: shared_1.ERRORS.COMMENT_MISSING });
            if (!(yield this.db.getPost(req.params.postId, res.locals.userId))) {
                return res.status(404).send({ error: shared_1.ERRORS.POST_NOT_FOUND });
            }
            const commentForInsertion = {
                id: crypto_1.default.randomUUID(),
                postedAt: Date.now(),
                postId: req.params.postId,
                userId: res.locals.userId,
                comment: req.body.comment,
            };
            yield this.db.createComment(commentForInsertion);
            return res.sendStatus(200);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id)
                return res.status(404).send({ error: shared_1.ERRORS.COMMENT_ID_MISSING });
            yield this.db.deleteComment(req.params.id);
            return res.sendStatus(200);
        });
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId) {
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            }
            const comments = yield this.db.listComments(req.params.postId);
            return res.send({ comments });
        });
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId) {
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            }
            const count = yield this.db.countComments(req.params.postId);
            return res.send({ count });
        });
        this.db = db;
    }
}
exports.CommentHandler = CommentHandler;
//# sourceMappingURL=commentHandler.js.map