import { Injectable } from '@nestjs/common';

type VectorItem = {
  text: string;
  embedding: number[];
};

@Injectable()
export class VectorService {
  private store: VectorItem[] = [];

  add(text: string, embedding: number[]) {
    this.store.push({ text, embedding });
  }

  search(queryEmbedding: number[], topK = 3): string[] {
    const scored = this.store.map((item) => ({
      text: item.text,
      score: this.cosineSimilarity(queryEmbedding, item.embedding),
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((i) => i.text);
  }

  private cosineSimilarity(a: number[], b: number[]) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
  }
}
