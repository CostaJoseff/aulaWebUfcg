"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DadoIndisponivelError = void 0;
const common_1 = require("@nestjs/common");
class DadoIndisponivelError extends common_1.HttpException {
    constructor(dadoIndisponivel) {
        super({
            message: `${dadoIndisponivel} informado não está disponível.`,
            statusCode: 409,
            dadoIndisponivel
        }, 409);
    }
    toString() {
        return `{
      message: X informado não está disponível.,
      statusCode: 409,
      dadoIndisponível: cpf
    }`;
    }
}
exports.DadoIndisponivelError = DadoIndisponivelError;
//# sourceMappingURL=DadoIndisponivelError.js.map