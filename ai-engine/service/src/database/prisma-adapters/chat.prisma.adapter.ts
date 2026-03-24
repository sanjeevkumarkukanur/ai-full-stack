import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatAdapter } from '../adapters/chat.adapter';

@Injectable()
export class ChatPrismaAdapter implements ChatAdapter {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ SAVE CHAT
  async save(userId: number, message: string, response: string) {
    return this.prisma.chat.create({
      data: {
        userId,
        message,
        response,
      },
    });
  }

  // ✅ GET ALL CHATS
  async findAll(): Promise<any[]> {
    return this.prisma.chat.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ GET USER CHATS
  async findByUser(userId: number): Promise<any[]> {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // (Optional) Keep alias if you want
  async getUserChats(userId: number) {
    return this.findByUser(userId);
  }
}
