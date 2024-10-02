"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenhasDiferentesError = void 0;
class SenhasDiferentesError extends Error {
    constructor() {
        super("A senha atual informada não confere com a senha atual registrada");
        this.nome = "Bad Request";
        this.statusCode = 400;
    }
    toString() {
        return `{
      message: A senha atual informada não confere com a senha atual registrada,
      statusCode: 400
    }`;
    }
}
exports.SenhasDiferentesError = SenhasDiferentesError;
//# sourceMappingURL=SenhasDiferentesError.js.map