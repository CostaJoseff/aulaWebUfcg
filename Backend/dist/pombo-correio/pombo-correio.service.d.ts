import { ConfigService } from "@nestjs/config";
export declare class PomboCorreioService {
    private config;
    private trasporter;
    constructor(config: ConfigService);
    enviarEmail(para: string, assunto: string, conteudoHTML: string): Promise<void>;
}
