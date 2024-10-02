export declare class NaoEhCpfError extends Error {
    readonly nome: string;
    readonly statusCode: number;
    constructor(cpf: string);
    toString(): string;
}
