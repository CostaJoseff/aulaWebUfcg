import { ApiProperty } from "@nestjs/swagger";
import { Direcao } from "@prisma/client";

export class LinhaSwaggerDTO {

    @ApiProperty()
    id: number

    @ApiProperty({example: "Semaforo de entrada Rua Bonita"})
    nome: string

    @ApiProperty({example: [15, 3566, 145, 654]})
    coordenadas: number[]

    @ApiProperty({
        description: "Existem 4 tipos de direção: CIMA_BAIXO, BAIXO_CIMA, DIREITA_ESQUERDA e ESQUERDA_DIREITA",
        example: Direcao.CIMA_BAIXO
    })
    direcao: Direcao

    @ApiProperty({example: [255, 51, 21]})
    cor: number[]

    @ApiProperty()
    carros: number

    @ApiProperty()
    motos: number

    @ApiProperty()
    onibus: number

    @ApiProperty()
    caminhoes: number

    @ApiProperty()
    vans: number

    @ApiProperty({example: 3})
    relatorioId: number
}