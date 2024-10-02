import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class TabelaDTO {

    @ApiProperty()
    @IsNumber()
    xi: number

    @ApiProperty()
    @IsNumber()
    yi: number

    @ApiProperty()
    @IsNumber()
    xf: number

    @ApiProperty()
    @IsNumber()
    yf: number

    @ApiProperty({ example: [255, 0, 156] })
    @IsArray()
    corDoQuadro: number[]

}