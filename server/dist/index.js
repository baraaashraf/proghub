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
const dotenv_1 = __importDefault(require("dotenv"));
const logging_1 = require("./logging");
const app_1 = require("./app");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // read .env file
    dotenv_1.default.config();
    const { ENV, PORT } = process.env;
    if (!ENV || !PORT) {
        logging_1.LOGGER.error('Missing some required env vars');
        process.exit(1);
    }
    const server = yield (0, app_1.createServer)();
    server.listen(PORT, () => logging_1.LOGGER.info(`Listening on port ${PORT} in ${ENV} environment`));
}))();
//# sourceMappingURL=index.js.map