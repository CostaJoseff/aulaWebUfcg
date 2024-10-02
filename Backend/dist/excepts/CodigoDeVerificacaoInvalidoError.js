"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodigoDeVerificacaoInvalidoError = void 0;
class CodigoDeVerificacaoInvalidoError extends Error {
    constructor() {
        super(`O codigo de verificação não é válido.`);
        this.nome = "Unauthorized";
        this.statusCode = 401;
    }
    toString() {
        return `{
      message: O codigo de verificação não é válido.,
      statusCode: 401
    }`;
    }
}
exports.CodigoDeVerificacaoInvalidoError = CodigoDeVerificacaoInvalidoError;
//# sourceMappingURL=CodigoDeVerificacaoInvalidoError.js.map