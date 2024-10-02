import { Direcao } from "@prisma/client";
export declare class LinhaDTO {
    nome: string;
    coordenadas: number[];
    cor: number[];
    direcao: Direcao;
}
