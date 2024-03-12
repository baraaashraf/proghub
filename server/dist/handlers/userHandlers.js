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
exports.UserHandler = void 0;
const shared_1 = require("@proghub/shared");
const crypto_1 = __importDefault(require("crypto"));
const auth_1 = require("../auth");
class UserHandler {
    constructor(db) {
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.sendStatus(400);
            }
            const existing = (yield this.db.getUserByEmail(login)) || (yield this.db.getUserByUsername(login));
            if (!existing || existing.password !== this.hashPassword(password)) {
                return res.sendStatus(403);
            }
            const jwt = (0, auth_1.signJwt)({ userId: existing.id });
            return res.status(200).send({
                user: {
                    email: existing.email,
                    firstName: existing.firstName,
                    lastName: existing.lastName,
                    id: existing.id,
                    userName: existing.userName,
                },
                jwt,
            });
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, password, userName } = req.body;
            if (!email || !userName || !password) {
                return res.status(400).send({ error: shared_1.ERRORS.USER_REQUIRED_FIELDS });
            }
            if (yield this.db.getUserByEmail(email)) {
                return res.status(403).send({ error: shared_1.ERRORS.DUPLICATE_EMAIL });
            }
            if (yield this.db.getUserByUsername(userName)) {
                return res.status(403).send({ error: shared_1.ERRORS.DUPLICATE_USERNAME });
            }
            const user = {
                id: crypto_1.default.randomUUID(),
                email,
                firstName: firstName !== null && firstName !== void 0 ? firstName : '',
                lastName: lastName !== null && lastName !== void 0 ? lastName : '',
                userName: userName,
                password: this.hashPassword(password),
            };
            yield this.db.createUser(user);
            const jwt = (0, auth_1.signJwt)({ userId: user.id });
            return res.status(200).send({
                jwt,
            });
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                return res.sendStatus(400);
            const user = yield this.db.getUserById(id);
            if (!user) {
                return res.sendStatus(404);
            }
            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
            });
        });
        this.getCurrent = (_, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getUserById(res.locals.userId);
            if (!user) {
                return res.sendStatus(500);
            }
            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
            });
        });
        this.updateCurrentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const currentUserId = res.locals.userId;
            const { userName } = req.body;
            if (userName && (yield this.isDuplicateUserName(currentUserId, userName))) {
                return res.status(403).send({ error: shared_1.ERRORS.DUPLICATE_USERNAME });
            }
            const currentUser = yield this.db.getUserById(currentUserId);
            if (!currentUser) {
                return res.status(404).send({ error: shared_1.ERRORS.USER_NOT_FOUND });
            }
            yield this.db.updateCurrentUser({
                id: currentUserId,
                userName: userName !== null && userName !== void 0 ? userName : currentUser.userName,
                firstName: (_a = req.body.firstName) !== null && _a !== void 0 ? _a : currentUser.firstName,
                lastName: (_b = req.body.lastName) !== null && _b !== void 0 ? _b : currentUser.lastName,
            });
            return res.sendStatus(200);
        });
        this.db = db;
    }
    isDuplicateUserName(currentUserId, newUserName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithProvidedUserName = yield this.db.getUserByUsername(newUserName);
            // returns true if we have a user with this userName and it's not the authenticated user
            return (userWithProvidedUserName != undefined) && (userWithProvidedUserName.id !== currentUserId);
        });
    }
    hashPassword(password) {
        return crypto_1.default
            .pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512')
            .toString('hex');
    }
}
exports.UserHandler = UserHandler;
//# sourceMappingURL=userHandlers.js.map