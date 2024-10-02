"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorEmailError = void 0;
const common_1 = require("@nestjs/common");
class ConstructorEmailError extends common_1.HttpException {
    constructor() {
        super({
            message: `Serviço de email indisponível`,
            statusCode: 503,
        }, 503);
    }
    toString() {
        return `{
      message: Serviço de email indisponível,
      statusCode: 503
    }`;
    }
}
exports.ConstructorEmailError = ConstructorEmailError;
//# sourceMappingURL=ConstructorEmailError.js.map