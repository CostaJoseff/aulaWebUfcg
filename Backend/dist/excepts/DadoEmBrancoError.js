"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DadoEmBrancoError = void 0;
const common_1 = require("@nestjs/common");
class DadoEmBrancoError extends common_1.HttpException {
    constructor(dadoEmBranco) {
        super({
            message: `${dadoEmBranco} não pode estar em branco.`,
            statusCode: 400,
            dadoEmBranco: dadoEmBranco.split(" ").length === 2 ? dadoEmBranco.split(" ")[1] : dadoEmBranco
        }, 400);
    }
    toString() {
        return `{
      message: X não pode estar em branco,
      statusCode: 400,
      dadoEmBranco: X
    }`;
    }
}
exports.DadoEmBrancoError = DadoEmBrancoError;
//# sourceMappingURL=DadoEmBrancoError.js.map