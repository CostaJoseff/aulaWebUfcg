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
exports.EsqueciMinhSenhaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const CodigoDeVerificacaoInvalidoError_1 = require("../excepts/CodigoDeVerificacaoInvalidoError");
class EsqueciMinhSenhaDTO {
    validarDados() {
        this.codigo = this.codigo.trim();
        if (this.codigo.length !== 4) {
            throw new CodigoDeVerificacaoInvalidoError_1.CodigoDeVerificacaoInvalidoError();
        }
    }
}
exports.EsqueciMinhSenhaDTO = EsqueciMinhSenhaDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EsqueciMinhSenhaDTO.prototype, "codigo", void 0);
//# sourceMappingURL=esqueciMinhaSenha.dto.js.map