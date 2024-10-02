export declare class NaoEhEmailError extends Error {
    readonly nome: string;
    readonly statusCode: number;
    constructor(email: string);
    toString(): string;
}
