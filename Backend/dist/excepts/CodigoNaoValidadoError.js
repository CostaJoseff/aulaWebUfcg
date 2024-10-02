"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodigoNaoValidadoError = void 0;
class CodigoNaoValidadoError extends Error {
    constructor() {
        super(`O codigo de verificação não foi validado.`);
        this.nome = "Forbidden";
        this.statusCode = 403;
    }
    toString() {
        return `{
        message: O codigo de verificação não foi validado,
        statusCode: 403
      }`;
    }
}
exports.CodigoNaoValidadoError = CodigoNaoValidadoError;
//# sourceMappingURL=CodigoNaoValidadoError.js.map