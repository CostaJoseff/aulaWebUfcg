import { HttpException } from "@nestjs/common";
export declare class DadoIndisponivelError extends HttpException {
    constructor(dadoIndisponivel: string);
    toString(): string;
}
