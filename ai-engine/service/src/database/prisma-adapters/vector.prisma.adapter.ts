import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VectorAdapter } from '../adapters/vector.adapter';

@Injectable()
export class VectorPrismaAdapter implements VectorAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async add(content: string, embedding: number[]) {
    await this.prisma.document.create({
      data: {
        content,
        embedding,
      },
    });
  }

  async search(): Promise<string[]> {
    const docs = await this.prisma.document.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) => doc.content);
  }

  async findAll() {
    return this.prisma.document.findMany();
  }
}
