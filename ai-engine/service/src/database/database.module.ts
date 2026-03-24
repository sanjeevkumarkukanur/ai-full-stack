import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserPrismaAdapter } from './prisma-adapters/user.prisma.adapter';
import { ChatPrismaAdapter } from './prisma-adapters/chat.prisma.adapter';
import { VectorPrismaAdapter } from './prisma-adapters/vector.prisma.adapter';

@Global()
@Module({
  providers: [
    PrismaService,

    // Adapters
    {
      provide: 'USER_ADAPTER',
      useClass: UserPrismaAdapter,
    },
    {
      provide: 'CHAT_ADAPTER',
      useClass: ChatPrismaAdapter,
    },
    {
      provide: 'VECTOR_ADAPTER',
      useClass: VectorPrismaAdapter,
    },
  ],
  exports: [PrismaService, 'USER_ADAPTER', 'CHAT_ADAPTER', 'VECTOR_ADAPTER'],
})
export class DatabaseModule {}
