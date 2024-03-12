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
exports.enforceJwtMiddleware = exports.jwtParseMiddleware = void 0;
const shared_1 = require("@proghub/shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../auth");
const datastore_1 = require("../datastore");
const jwtParseMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return next();
    }
    let payload;
    try {
        payload = (0, auth_1.verifyJwt)(token);
    }
    catch (e) {
        const verifyErr = e;
        if (verifyErr instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).send({ error: shared_1.ERRORS.TOKEN_EXPIRED });
        }
        return res.status(401).send({ error: shared_1.ERRORS.BAD_TOKEN });
    }
    const user = yield datastore_1.db.getUserById(payload.userId);
    if (!user) {
        return res.status(401).send({ error: shared_1.ERRORS.USER_NOT_FOUND });
    }
    res.locals.userId = user.id;
    return next();
});
exports.jwtParseMiddleware = jwtParseMiddleware;
const enforceJwtMiddleware = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.userId) {
        return res.sendStatus(401);
    }
    return next();
});
exports.enforceJwtMiddleware = enforceJwtMiddleware;
//# sourceMappingURL=authMiddleware.js.map