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
exports.createServer = void 0;
const shared_1 = require("@proghub/shared");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const datastore_1 = require("./datastore");
const commentHandler_1 = require("./handlers/commentHandler");
const likeHandler_1 = require("./handlers/likeHandler");
const postHandlers_1 = require("./handlers/postHandlers");
const userHandlers_1 = require("./handlers/userHandlers");
const logging_1 = require("./logging");
const authMiddleware_1 = require("./middleware/authMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
function createServer(logRequests = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbPath = process.env.DB_PATH;
        if (!dbPath) {
            logging_1.LOGGER.error('DB_PATH env var missing');
            process.exit(1);
        }
        yield (0, datastore_1.initDb)(dbPath);
        // create express app
        const app = (0, express_1.default)();
        // middlewares for parsing JSON payloads and opening up cors policy
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        if (logRequests) {
            // log incoming Requests
            app.use(loggerMiddleware_1.loggerMiddleware);
        }
        const userHandler = new userHandlers_1.UserHandler(datastore_1.db);
        const postHandler = new postHandlers_1.PostHandler(datastore_1.db);
        const likeHandler = new likeHandler_1.LikeHandler(datastore_1.db);
        const commentHandler = new commentHandler_1.CommentHandler(datastore_1.db);
        // map of endpoints handlers
        const HANDLERS = {
            [shared_1.Endpoints.healthz]: (_, res) => res.send({ status: 'ok!' }),
            [shared_1.Endpoints.signin]: userHandler.signIn,
            [shared_1.Endpoints.signup]: userHandler.signUp,
            [shared_1.Endpoints.getUser]: userHandler.get,
            [shared_1.Endpoints.getCurrentUser]: userHandler.getCurrent,
            [shared_1.Endpoints.updateCurrentUser]: userHandler.updateCurrentUser,
            [shared_1.Endpoints.listPosts]: postHandler.list,
            [shared_1.Endpoints.getPost]: postHandler.get,
            [shared_1.Endpoints.createPost]: postHandler.create,
            [shared_1.Endpoints.deletePost]: postHandler.delete,
            [shared_1.Endpoints.listLikes]: likeHandler.list,
            [shared_1.Endpoints.createLike]: likeHandler.create,
            [shared_1.Endpoints.deleteLike]: likeHandler.delete,
            [shared_1.Endpoints.countComments]: commentHandler.count,
            [shared_1.Endpoints.listComments]: commentHandler.list,
            [shared_1.Endpoints.createComment]: commentHandler.create,
            [shared_1.Endpoints.deleteComment]: commentHandler.delete,
        };
        // register handlers in express
        Object.keys(shared_1.Endpoints).forEach(entry => {
            const config = shared_1.ENDPOINT_CONFIGS[entry];
            const handler = HANDLERS[entry];
            config.auth
                ? app[config.method](config.url, authMiddleware_1.jwtParseMiddleware, authMiddleware_1.enforceJwtMiddleware, (0, express_async_handler_1.default)(handler))
                : app[config.method](config.url, authMiddleware_1.jwtParseMiddleware, (0, express_async_handler_1.default)(handler));
        });
        app.use(errorMiddleware_1.errHandler);
        // start server, https in production, otherwise http.
        const { ENV } = process.env;
        if (!ENV) {
            throw 'Environment not defined, make sure to pass in env vars or have a .env file at root.';
        }
        return app;
    });
}
exports.createServer = createServer;
//# sourceMappingURL=app.js.map