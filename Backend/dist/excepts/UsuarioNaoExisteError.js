"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioNaoExisteError = void 0;
class UsuarioNaoExisteError extends Error {
    constructor() {
        super("Usuário não encontrado");
        this.nome = "Not found";
        this.statusCode = 404;
    }
    toString() {
        return `{
      message: Usuário não encontrado,
      statusCode: 404
    }`;
    }
}
exports.UsuarioNaoExisteError = UsuarioNaoExisteError;
//# sourceMappingURL=UsuarioNaoExisteError.js.map