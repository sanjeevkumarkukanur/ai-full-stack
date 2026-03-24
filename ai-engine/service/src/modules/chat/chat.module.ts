import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RagModule } from '../rag/rag.module';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [RagModule, AppConfigModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
