import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserAdapter } from '../adapters/user.adapter';

@Injectable()
export class UserPrismaAdapter implements UserAdapter {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
