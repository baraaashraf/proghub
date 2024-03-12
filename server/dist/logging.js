"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pino_1 = require("pino");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const streams = [
    process.env.ENV === 'production' ? process.stdout : (0, pino_pretty_1.default)(),
    fs_1.default.createWriteStream(path_1.default.join(__dirname, '..', 'process.log')),
];
exports.LOGGER = (0, pino_1.pino)({
    redact: ['body.password'],
    formatters: {
        bindings: () => ({}),
    },
}, pino_1.pino.multistream(streams));
//# sourceMappingURL=logging.js.map