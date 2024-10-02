import { Direcao } from "@prisma/client";
export declare class LinhaSwaggerDTO {
    id: number;
    nome: string;
    coordenadas: number[];
    direcao: Direcao;
    cor: number[];
    carros: number;
    motos: number;
    onibus: number;
    caminhoes: number;
    vans: number;
    relatorioId: number;
}
