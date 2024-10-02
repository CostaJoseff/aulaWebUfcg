"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoEhCpfError = void 0;
class NaoEhCpfError extends Error {
    constructor(cpf) {
        super(`${cpf} não é aceito como cpf.`);
        this.nome = "Bad Request";
        this.statusCode = 400;
    }
    toString() {
        return `{
        message: X não é aceito como cpf,
        statusCode: 400,
      }`;
    }
}
exports.NaoEhCpfError = NaoEhCpfError;
//# sourceMappingURL=NaoEhCpfError.js.map