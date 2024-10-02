"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacaoExpirouError = void 0;
class SolicitacaoExpirouError extends Error {
    constructor() {
        super(`A solicitação expirou, o token não é mais válido.`);
        this.nome = "Unauthorized";
        this.statusCode = 401;
    }
    toString() {
        return `{
      message: A solicitação expirou, o token não é mais válido,
      statusCode: 401
    }`;
    }
}
exports.SolicitacaoExpirouError = SolicitacaoExpirouError;
//# sourceMappingURL=SolicitacaoExpirouError.js.map