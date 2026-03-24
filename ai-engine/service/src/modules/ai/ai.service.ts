import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

// ✅ Define types
interface OllamaGenerateResponse {
  response: string;
}

interface OllamaEmbeddingResponse {
  embedding: number[];
}

@Injectable()
export class AiService {
  private baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

  async generate(prompt: string): Promise<string> {
    try {
      const res = await axios.post<OllamaGenerateResponse>(
        `${this.baseURL}/api/generate`,
        {
          model: 'llama3',
          prompt,
          stream: false,
        },
      );

      return res.data.response; // ✅ now safe
    } catch (error) {
      console.error('Ollama Generate Error:', error);
      throw new InternalServerErrorException('AI generation failed');
    }
  }

  async embedding(text: string): Promise<number[]> {
    try {
      const res = await axios.post<OllamaEmbeddingResponse>(
        `${this.baseURL}/api/embeddings`,
        {
          model: 'nomic-embed-text',
          prompt: text,
        },
      );

      return res.data.embedding; // ✅ safe
    } catch (error) {
      console.error('Embedding Error:', error);
      throw new InternalServerErrorException('Embedding failed');
    }
  }
}
