import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AppConfigService } from '../../config/config.service';

interface AppJwtPayload {
  sub: number;
  email: string;
}

type RequestWithUser = Request & {
  user?: AppJwtPayload;
};

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private config: AppConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const authHeader = request.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, this.config.jwtSecret);

      // ✅ SAFE TYPE CHECK (no unsafe cast)
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'sub' in decoded &&
        'email' in decoded
      ) {
        request.user = {
          sub: Number(decoded.sub),
          email: String(decoded.email),
        };

        return true;
      }

      throw new UnauthorizedException('Invalid token payload');
    } catch (err) {
      console.log('JWT ERROR:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
