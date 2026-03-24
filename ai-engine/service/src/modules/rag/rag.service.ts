import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { VectorService } from '../vector/vector.service';

@Injectable()
export class RagService {
  constructor(
    private aiService: AiService,
    private vectorService: VectorService,
  ) {}

  async ingest(text: string) {
    const embedding = await this.aiService.embedding(text);
    this.vectorService.add(text, embedding);
  }

  async ask(question: string) {
    const queryEmbedding = await this.aiService.embedding(question);

    const context = this.vectorService.search(queryEmbedding).join('\n');

    const prompt = `
Use the context below to answer:

${context}

Question: ${question}
`;

    return this.aiService.generate(prompt);
  }
}
