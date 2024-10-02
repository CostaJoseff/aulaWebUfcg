import { ApiProperty } from "@nestjs/swagger";
import { Direcao } from "@prisma/client";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "class-validator";

export class LinhaDTO {

    @ApiProperty()
    @IsString()
    nome: string

    @ApiProperty({
        description: "Os pontos x e y da linha organizados como [xi, yi, xf, yf]",
        example: [0, 100, 50, 150]
    })
    @IsArray()
    coordenadas: number[]

    @ApiProperty({
        description: "Cor organizada em RGB limitada a 255",
        example: [0, 255, 255]
    })
    @IsArray()
    cor: number[]

    @ApiProperty({ example: "CIMA_BAIXO" })
    @IsEnum(Direcao)
    direcao: Direcao

}