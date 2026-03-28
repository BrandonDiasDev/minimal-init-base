import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export class MessageController {
    async createMessage(req: Request, res: Response) {
        try {
            const message = await messageService.createMessage(req.body);
            res.status(201).json(message);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async listMessages(req: Request, res: Response) {
        try {
            const messages = await messageService.listMessages();
            res.json(messages);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMessageById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const message = await messageService.getById(id);
            if (!message) {
                return res.status(404).json({ error: "Recado não encontrado!" });
            }
            res.json(message);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
