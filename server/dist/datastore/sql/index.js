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
exports.SqlDataStore = void 0;
const path_1 = __importDefault(require("path"));
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const logging_1 = require("../../logging");
const seeds_1 = require("./seeds");
class SqlDataStore {
    openDb(dbPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ENV } = process.env;
            // open the database
            try {
                logging_1.LOGGER.info('Opening database file at:', dbPath);
                this.db = yield (0, sqlite_1.open)({
                    filename: dbPath,
                    driver: sqlite3_1.default.Database,
                    mode: sqlite3_1.default.OPEN_READWRITE,
                });
            }
            catch (e) {
                logging_1.LOGGER.error('Failed to open database at path:', dbPath, 'err:', e);
                process.exit(1);
            }
            this.db.run('PRAGMA foreign_keys = ON;');
            yield this.db.migrate({
                migrationsPath: path_1.default.join(__dirname, 'migrations'),
            });
            if (ENV === 'development') {
                logging_1.LOGGER.info('Seeding data...');
                seeds_1.SEED_USERS.forEach((u) => __awaiter(this, void 0, void 0, function* () {
                    if (!(yield this.getUserById(u.id)))
                        yield this.createUser(u);
                }));
                seeds_1.SEED_POSTS.forEach((p) => __awaiter(this, void 0, void 0, function* () {
                    if (!(yield this.getPostByUrl(p.url)))
                        yield this.createPost(p);
                }));
            }
            return this;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)', user.id, user.email, user.password, user.firstName, user.lastName, user.userName);
        });
    }
    updateCurrentUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('UPDATE users SET userName = ?, firstName = ?, lastName = ? WHERE id = ?', user.userName, user.firstName, user.lastName, user.id);
        });
    }
    getUserById(id) {
        return this.db.get(`SELECT * FROM users WHERE id = ?`, id);
    }
    getUserByEmail(email) {
        return this.db.get(`SELECT * FROM users WHERE email = ?`, email);
    }
    getUserByUsername(userName) {
        return this.db.get(`SELECT * FROM users WHERE userName = ?`, userName);
    }
    listPosts(userId) {
        return this.db.all(`SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = posts.id AND likes.userId = ?
      ) as liked FROM posts ORDER BY postedAt DESC`, userId);
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)', post.id, post.title, post.url, post.postedAt, post.userId);
        });
    }
    getPost(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get(`SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = ? AND likes.userId = ?
      ) as liked FROM posts WHERE id = ?`, id, userId, id);
        });
    }
    getPostByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get(`SELECT * FROM posts WHERE url = ?`, url);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('Delete FROM posts WHERE id = ?', id);
        });
    }
    createLike(like) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO likes(userId, postId) VALUES(?,?)', like.userId, like.postId);
        });
    }
    deleteLike(like) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('DELETE FROM likes WHERE userId = ? AND postId = ?', like.userId, like.postId);
        });
    }
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO Comments(id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)', comment.id, comment.userId, comment.postId, comment.comment, comment.postedAt);
        });
    }
    countComments(postId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.get('SELECT COUNT(*) as count FROM comments WHERE postId = ?', postId);
            return (_a = result === null || result === void 0 ? void 0 : result.count) !== null && _a !== void 0 ? _a : 0;
        });
    }
    listComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all('SELECT * FROM comments WHERE postId = ? ORDER BY postedAt DESC', postId);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('DELETE FROM comments WHERE id = ?', id);
        });
    }
    getLikes(postId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.db.get('SELECT COUNT(*) as count FROM likes WHERE postId = ?', postId);
            return (_a = result === null || result === void 0 ? void 0 : result.count) !== null && _a !== void 0 ? _a : 0;
        });
    }
    exists(like) {
        return __awaiter(this, void 0, void 0, function* () {
            let awaitResult = yield this.db.get('SELECT 1 FROM likes WHERE postId = ? and userId = ?', like.postId, like.userId);
            let val = awaitResult === undefined ? false : true;
            return val;
        });
    }
}
exports.SqlDataStore = SqlDataStore;
//# sourceMappingURL=index.js.map