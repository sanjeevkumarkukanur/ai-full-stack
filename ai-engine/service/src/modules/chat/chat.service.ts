import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { RagService } from '../rag/rag.service';
import { ChatAdapter } from '../../database/adapters/chat.adapter';

@Injectable()
export class ChatService {
  constructor(
    private readonly ragService: RagService,

    @Inject('CHAT_ADAPTER')
    private readonly chatAdapter: ChatAdapter,
  ) {}

  // ✅ CHAT + SAVE
  async chat(userId: number, message: string) {
    if (!message) {
      throw new BadRequestException('Message is required');
    }

    const response = await this.ragService.ask(message);

    await this.chatAdapter.save(userId, message, response);

    return {
      success: true,
      data: {
        response,
      },
    };
  }

  // ✅ TRAIN (OPTIONAL: USER-SPECIFIC RAG)
  async train(userId: number, text: string) {
    if (!text) {
      throw new BadRequestException('Training text is required');
    }

    await this.ragService.ingest(text);

    return {
      success: true,
      message: 'Training completed',
    };
  }

  // ✅ GET ALL CHATS
  async getAllChats() {
    const chats = await this.chatAdapter.findAll();

    return {
      success: true,
      data: chats,
    };
  }

  // ✅ GET CHATS BY USER
  async getChatsByUser(userId: number) {
    const chats = await this.chatAdapter.findByUser(userId);

    return {
      success: true,
      data: chats,
    };
  }
}
