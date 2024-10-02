import { ApiProperty } from "@nestjs/swagger";
import { LinhaDTO } from "./linha.dto";
import { TabelaDTO } from "./tabela.dto";
import { IsArray, IsObject } from "class-validator";

export class SolicitarContagemDTO {

    @ApiProperty({ type: [LinhaDTO] })
    @IsArray()
    linhas: LinhaDTO[]

    @ApiProperty({ type: TabelaDTO })
    @IsObject()
    tabelaDTO: TabelaDTO

}