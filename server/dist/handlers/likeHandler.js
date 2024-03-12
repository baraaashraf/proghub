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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeHandler = void 0;
const shared_1 = require("@proghub/shared");
class LikeHandler {
    constructor(db) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId) {
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            }
            if (!(yield this.db.getPost(req.params.postId))) {
                return res.status(404).send({ error: shared_1.ERRORS.POST_NOT_FOUND });
            }
            let found = yield this.db.exists({
                postId: req.params.postId,
                userId: res.locals.userId,
            });
            if (found) {
                return res.status(400).send({ error: shared_1.ERRORS.DUPLICATE_LIKE });
            }
            const likeForInsert = {
                postId: req.params.postId,
                userId: res.locals.userId,
            };
            this.db.createLike(likeForInsert);
            return res.sendStatus(200);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId) {
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            }
            if (!(yield this.db.getPost(req.params.postId))) {
                return res.status(404).send({ error: shared_1.ERRORS.POST_NOT_FOUND });
            }
            const likeForDelete = {
                postId: req.params.postId,
                userId: res.locals.userId,
            };
            this.db.deleteLike(likeForDelete);
            return res.sendStatus(200);
        });
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.postId) {
                return res.status(400).send({ error: shared_1.ERRORS.POST_ID_MISSING });
            }
            const count = yield this.db.getLikes(req.params.postId);
            return res.send({ likes: count });
        });
        this.db = db;
    }
}
exports.LikeHandler = LikeHandler;
//# sourceMappingURL=likeHandler.js.map