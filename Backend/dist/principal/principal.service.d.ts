import { PrismaService } from "src/prisma/prisma.service";
import { SolicitarContagemDTO } from "src/DTOs/solicitarContagem.dto";
export declare class PrincipalService {
    private prisma;
    private LOGGER;
    private queue;
    private contando;
    constructor(prisma: PrismaService);
    efetuarContagem(matricula: string, solicitarContagemDTO: SolicitarContagemDTO, nomeDoVideo: string): Promise<{
        message: string;
        statusCode: number;
    }>;
    private streamToConsole;
    private direcaoToPython;
    private produzirLinhasPython;
    private produzirTabela;
    private chamarPython;
}
