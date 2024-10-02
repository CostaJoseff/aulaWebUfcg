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
exports.AlterarSenhaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const DadoEmBrancoError_1 = require("../excepts/DadoEmBrancoError");
const SenhaPequenaError_1 = require("../excepts/SenhaPequenaError");
class AlterarSenhaDTO {
    validarDados() {
        this.senhaAtual = this.senhaAtual.trim();
        this.novaSenha = this.novaSenha.trim();
        switch (true) {
            case (this.senhaAtual.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("A senha atual");
            case (this.senhaAtual.length <= 5 || this.novaSenha.length <= 5):
                throw new SenhaPequenaError_1.SenhaPequenaError();
            case (this.novaSenha.length === 0):
                throw new DadoEmBrancoError_1.DadoEmBrancoError("A nova senha");
        }
    }
}
exports.AlterarSenhaDTO = AlterarSenhaDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AlterarSenhaDTO.prototype, "senhaAtual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AlterarSenhaDTO.prototype, "novaSenha", void 0);
//# sourceMappingURL=alterarsenha.dto.js.map