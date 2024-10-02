export declare class CodigoNaoValidadoError extends Error {
    readonly nome: string;
    readonly statusCode: number;
    constructor();
    toString(): string;
}
