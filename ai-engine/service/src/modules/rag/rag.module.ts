import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { AiModule } from '../ai/ai.module';
import { VectorModule } from '../vector/vector.module';

@Module({
  imports: [AiModule, VectorModule],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
