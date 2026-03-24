import { ApiProperty } from '@nestjs/swagger';

export class TrainDto {
  @ApiProperty({ example: 'RAG means Retrieval Augmented Generation' })
  text: string;
}
