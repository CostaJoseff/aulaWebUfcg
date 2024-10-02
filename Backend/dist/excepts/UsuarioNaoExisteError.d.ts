export declare class UsuarioNaoExisteError extends Error {
    readonly nome: string;
    readonly statusCode: number;
    constructor();
    toString(): string;
}
