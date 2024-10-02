import { StatusRelatorio } from "@prisma/client";
import { LinhaSwaggerDTO } from "./linhaSwagger.dto";
export declare class RelatorioDTO {
    id: number;
    url: number;
    dataDeExecucao: Date;
    status: StatusRelatorio;
    linhas: LinhaSwaggerDTO[];
    usuarioMatricula: string;
}
