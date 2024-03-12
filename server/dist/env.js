"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalt = exports.getJwtSecret = void 0;
const logging_1 = require("./logging");
// Throws on bad tokens
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        logging_1.LOGGER.error('Missing JWT secret');
        process.exit(1);
    }
    return secret;
}
exports.getJwtSecret = getJwtSecret;
function getSalt() {
    const salt = process.env.PASSWORD_SALT;
    if (!salt) {
        logging_1.LOGGER.error('Missing Password salt');
        process.exit(1);
    }
    return salt;
}
exports.getSalt = getSalt;
//# sourceMappingURL=env.js.map