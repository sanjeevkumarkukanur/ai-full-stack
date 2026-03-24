import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  // 🔐 APP
  get port(): number {
    return Number(this.config.get<string>('PORT')) || 3000;
  }

  get nodeEnv(): string {
    return this.config.get<string>('NODE_ENV') || 'development';
  }

  // 🗄️ DATABASE
  get databaseUrl(): string {
    const url = this.config.get<string>('DATABASE_URL');
    if (!url) {
      throw new Error('DATABASE_URL is not defined');
    }
    return url;
  }

  // 🔐 AUTH
  get jwtSecret(): string {
    return this.config.get<string>('JWT_SECRET') || 'secret';
  }

  get jwtExpiresIn(): string {
    return this.config.get<string>('JWT_EXPIRES_IN') || '1d';
  }

  // 🧠 OLLAMA
  get ollamaBaseUrl(): string {
    return (
      this.config.get<string>('OLLAMA_BASE_URL') || 'http://localhost:11434'
    );
  }

  get ollamaModel(): string {
    return this.config.get<string>('OLLAMA_MODEL') || 'llama3';
  }

  get embeddingModel(): string {
    return this.config.get<string>('OLLAMA_EMBED_MODEL') || 'nomic-embed-text';
  }

  // 📊 VECTOR
  get topK(): number {
    return Number(this.config.get<string>('VECTOR_TOP_K')) || 5;
  }
}
