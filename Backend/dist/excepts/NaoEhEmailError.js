"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoEhEmailError = void 0;
class NaoEhEmailError extends Error {
    constructor(email) {
        super(`${email} não é aceito como e-mail.`);
        this.nome = "Bad Request";
        this.statusCode = 400;
    }
    toString() {
        return `{
        message: X não é aceito como e-mail.,
        statusCode: 400
      }`;
    }
}
exports.NaoEhEmailError = NaoEhEmailError;
//# sourceMappingURL=NaoEhEmailError.js.map