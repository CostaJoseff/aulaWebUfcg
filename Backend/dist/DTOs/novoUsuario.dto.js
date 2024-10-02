"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovoUsuarioDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const DadoEmBrancoError_1 = require("../excepts/DadoEmBrancoError");
const NaoEhEmailError_1 = require("../excepts/NaoEhEmailError");
const SenhaPequenaError_1 = require("../excepts/SenhaPequenaError");
const validator_1 = require("validator");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const NaoEhCpfError_1 = require("../excepts/NaoEhCpfError");
class NovoUsuarioDTO {
    validarDados() {
        this.nome = this.nome.trim();
        this.matricula = this.matricula.trim();
        this.cpf = this.cpf.trim();
        this.cpf = cpf_cnpj_validator_1.cpf.format(this.cpf);
        this.email = this.email.trim();
        this.senha = this.senha.trim();
        this.URLFinalizarCriacao = this.URLFinalizarCriacao.trim();
        switch (true) {
            case (this.nome.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("O nome");
            case (this.matricula.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("A matricula");
            case (this.cpf.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("O cpf");
            case (!cpf_cnpj_validator_1.cpf.isValid(this.cpf)):
                throw new NaoEhCpfError_1.NaoEhCpfError(this.cpf);
            case (this.email.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("O email");
            case (!(0, validator_1.isEmail)(this.email)):
                throw new NaoEhEmailError_1.NaoEhEmailError(this.email);
            case (this.senha.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("A senha");
            case (this.senha.length <= 5):
                throw new SenhaPequenaError_1.SenhaPequenaError();
        }
    }
}
exports.NovoUsuarioDTO = NovoUsuarioDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: "O nome deve ser do tipo string" }),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: "A matricula deve ser do tipo string" }),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: "O CPF deve ser do tipo string" }),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Deve possuir no mínimo 5 caracteres (espaços no inicio e no final são desconsiderados)"
    }),
    (0, class_validator_1.IsString)({ message: "A senha deve ser do tipo string" }),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "senha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Essa URL deve ser o caminho para a tela de finalização de criação de conta. A tela de finalização de conta deve mandar uma requisição para o endpoint de finalização de conta que irá retornar sucesso ou fracasso e em caso de sucesso deve exibir o texto e um botão de redirecionamento para a tela de login."
    }),
    (0, class_validator_1.IsString)({ message: "A URL deve ser do tipo string" }),
    __metadata("design:type", String)
], NovoUsuarioDTO.prototype, "URLFinalizarCriacao", void 0);
//# sourceMappingURL=novoUsuario.dto.js.map