"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenhaPequenaError = void 0;
class SenhaPequenaError extends Error {
    constructor() {
        super("A senha deve ter mais de 5 dígitos.");
        this.nome = "Bad Request";
        this.statusCode = 400;
    }
    toString() {
        return `{
      message: A senha deve ter mais de 5 dígitos.,
      statusCode: 400
    }`;
    }
}
exports.SenhaPequenaError = SenhaPequenaError;
//# sourceMappingURL=SenhaPequenaError.js.map