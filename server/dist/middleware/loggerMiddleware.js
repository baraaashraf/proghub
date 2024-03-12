"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logging_1 = require("../logging");
const loggerMiddleware = (req, _, next) => {
    logging_1.LOGGER.info({
        method: req.method,
        path: req.path,
        body: Object.keys(req.body).length ? req.body : undefined,
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map