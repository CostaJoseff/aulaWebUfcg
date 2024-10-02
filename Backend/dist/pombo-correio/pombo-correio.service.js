"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomboCorreioService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const ConstructorEmailError_1 = require("../excepts/ConstructorEmailError");
const EnvioDeEmailError_1 = require("../excepts/EnvioDeEmailError");
let PomboCorreioService = class PomboCorreioService {
    constructor(config) {
        this.config = config;
        try {
            this.trasporter = nodemailer.createTransport({
                host: config.get("MAIL_HOST"),
                port: config.get("MAIL_PORT"),
                secute: true,
                auth: {
                    user: config.get("MAIL_USER"),
                    pass: config.get("MAIL_PASS")
                }
            });
        }
        catch (error) {
            throw new ConstructorEmailError_1.ConstructorEmailError();
        }
    }
    async enviarEmail(para, assunto, conteudoHTML) {
        try {
            const email = {
                from: this.config.get("MAIL_USER"),
                to: para,
                subject: assunto,
                html: conteudoHTML
            };
            await this.trasporter.sendMail(email);
        }
        catch (error) {
            throw new EnvioDeEmailError_1.EnvioDeEmailError();
        }
    }
};
exports.PomboCorreioService = PomboCorreioService;
exports.PomboCorreioService = PomboCorreioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PomboCorreioService);
//# sourceMappingURL=pombo-correio.service.js.map