import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface JwtUser {
  sub: number;
  email: string;
}

// Extend request type
type RequestWithUser = Request & {
  user: JwtUser;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    return request.user; // ✅ fully safe
  },
);
