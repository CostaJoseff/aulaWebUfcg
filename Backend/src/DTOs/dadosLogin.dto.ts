import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DadoEmBrancoError } from "src/excepts/DadoEmBrancoError";
import { SenhaPequenaError } from "src/excepts/SenhaPequenaError";

export class DadosLoginDTO {

    @ApiProperty()
    @IsString()
    matricula: string

    @ApiProperty()
    @IsString()
    senha: string
    
    validarDados() {
        this.matricula = this.matricula.trim();
        this.senha = this.senha.trim();

        switch (true){
            case (this.matricula.length === 0):
            throw new DadoEmBrancoError("A matricula");

            case (this.senha.length === 0):
            throw new DadoEmBrancoError("A senha");

            case (this.senha.length <= 5):
            throw new SenhaPequenaError();
        }
    }

}