import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AiModule } from './modules/ai/ai.module';
import { ChatModule } from './modules/chat/chat.module';
import { VectorModule } from './modules/vector/vector.module';
import { RagModule } from './modules/rag/rag.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AiModule,
    ChatModule,
    VectorModule,
    RagModule,
    AuthModule,
  ],
})
export class AppModule {}
