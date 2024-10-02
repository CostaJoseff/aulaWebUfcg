"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodigoJaValidadoError = void 0;
class CodigoJaValidadoError extends Error {
    constructor() {
        super(`O codigo de verificação já foi validado. A operação de finalização já foi liberada`);
        this.nome = "Forbidden";
        this.statusCode = 403;
    }
    toString() {
        return `{
        message: O codigo de verificação já foi validado. A operação de finalização já foi liberada,
        statusCode: 403
      }`;
    }
}
exports.CodigoJaValidadoError = CodigoJaValidadoError;
//# sourceMappingURL=CodigoJaValidadoError.js.map