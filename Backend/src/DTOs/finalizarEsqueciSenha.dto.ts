import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FinalizarEsqueciSenhaDTO {

    @ApiProperty()
    @IsString()
    novaSenha: string

    validarDados() {
        this.novaSenha = this.novaSenha.trim();
    }

}