import { ApiProperty } from "@nestjs/swagger";
import { StatusRelatorio } from "@prisma/client";
import { LinhaSwaggerDTO } from "./linhaSwagger.dto";

export class RelatorioDTO {

    @ApiProperty({example: 3})
    id: number

    @ApiProperty({
        description: "Caminho do youtube caso tenha sido efetuado upload ou caminho do backend (caminho do backend é utilizado pelo backend)",
        example: "/app/uploads/123456/resultado_video_resultado.mp4 ou https://youtube.com/video"
    })
    url: number

    @ApiProperty()
    dataDeExecucao: Date

    @ApiProperty({
        description: "5 tipos de status: EM_EXECUCAO, CONCLUIDO, NO_YOUTUBE, ERRO, USUARIO_DELETADO",
        example: "EM_EXECUCAO"
    })
    status: StatusRelatorio

    @ApiProperty({
        description: "Conjunto de linhas daquele relatorio",
        type: LinhaSwaggerDTO
    })
    linhas: LinhaSwaggerDTO[]

    @ApiProperty({
        example: "123456"
    })
    usuarioMatricula: string
}