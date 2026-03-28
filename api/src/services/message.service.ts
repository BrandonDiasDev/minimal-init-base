import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

type CreateMessageDTO = {
    authorName: string;
    content: string;
    ip?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    country?: string;
}

export class MessageService {
    async createMessage(data: CreateMessageDTO) {
        // Regra01: deve ter conteúdo escrito
        if (!data.content || data.content.trim() === "") {
            throw new Error("Vai deixar recado não, meu ambrósio? Escreve alguma coisa aí!");
        }
        
        // Regra02: limitar o tamanho do conteúdo
        if (data.content.length > 666) {
            throw new Error("Calma, sinforoso belicudo! Fale só 666 caracteres.");
        }

        // Regra03: identificar o autor do recado
        if (!data.authorName || data.authorName.trim() === "") {
            throw new Error("Hmm, minha esfinge salomênica, fala-me tua graça!");
        }

        return await prisma.message.create({
            data
        })      
    }

    async listMessages() {
        return await prisma.message.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async getById(id: string){
        return prisma.message.findUnique({
            where: {
                id
            }
        })
    }

}