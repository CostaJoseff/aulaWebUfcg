import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';
import { Subject } from "rxjs";
import { ConstructorEmailError } from "src/excepts/ConstructorEmailError";
import { EnvioDeEmailError } from "src/excepts/EnvioDeEmailError";

@Injectable()
export class PomboCorreioService {
    private trasporter: nodemailer.Transporter;

    constructor(private config: ConfigService) {
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
        } catch (error) {
            throw new ConstructorEmailError();
        }
    }

    async enviarEmail(para: string, assunto: string, conteudoHTML: string) {
        try {
            const email = {
                from: this.config.get("MAIL_USER"),
                to: para,
                subject: assunto,
                html: conteudoHTML
            }
            await this.trasporter.sendMail(email);
        } catch (error) {
            throw new EnvioDeEmailError();
        }
    }
}