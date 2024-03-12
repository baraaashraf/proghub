"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const logging_1 = require("../logging");
const errHandler = (err, _, res, __) => {
    logging_1.LOGGER.error('Uncaught exception:', err);
    return res.status(500).send('Oops, an unexpected error occurred, please try again');
};
exports.errHandler = errHandler;
//# sourceMappingURL=errorMiddleware.js.map