import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CodigoDeVerificacaoInvalidoError } from "src/excepts/CodigoDeVerificacaoInvalidoError";

export class EsqueciMinhSenhaDTO {

    @ApiProperty()
    @IsString()
    codigo: string

    validarDados() {
        this.codigo = this.codigo.trim();
        if (this.codigo.length !== 4) { throw new CodigoDeVerificacaoInvalidoError() }
    }

}