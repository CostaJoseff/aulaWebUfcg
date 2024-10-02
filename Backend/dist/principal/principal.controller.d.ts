import { PrincipalService } from "./principal.service";
export declare class PrincipalController {
    private service;
    constructor(service: PrincipalService);
    efetuarContagem(req: any, file: Express.Multer.File): Promise<{
        message: string;
        statusCode: number;
    }>;
}
