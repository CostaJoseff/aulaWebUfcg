import { HttpException } from "@nestjs/common";
export declare class DadoEmBrancoError extends HttpException {
    constructor(dadoEmBranco: string);
    toString(): string;
}
