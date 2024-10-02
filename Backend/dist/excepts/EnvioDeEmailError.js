"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioDeEmailError = void 0;
const common_1 = require("@nestjs/common");
class EnvioDeEmailError extends common_1.HttpException {
    constructor() {
        super({
            message: `Falha ao enviar email`,
            statusCode: 500,
        }, 503);
    }
    toString() {
        return `{
      message: Falha ao enviar email,
      statusCode: 500
    }`;
    }
}
exports.EnvioDeEmailError = EnvioDeEmailError;
//# sourceMappingURL=EnvioDeEmailError.js.map