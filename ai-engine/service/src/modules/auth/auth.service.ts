import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from '../../config/config.service';
import { UserAdapter } from 'src/database/adapters/user.adapter';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_ADAPTER')
    private readonly userAdapter: UserAdapter,

    @Inject(AppConfigService) // ✅ FIX HERE
    private readonly config: AppConfigService,
  ) {}

  // ✅ REGISTER
  async register(email: string, password: string) {
    const existingUser = await this.userAdapter.findByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userAdapter.create(email, hashedPassword);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  // ✅ LOGIN
  async login(email: string, password: string) {
    const user = await this.userAdapter.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      this.config.jwtSecret,
      {
        expiresIn: this.config.jwtExpiresIn as jwt.SignOptions['expiresIn'], // ✅ FIX
      },
    );

    return {
      access_token: token,
    };
  }

  // ✅ VERIFY TOKEN
  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.config.jwtSecret);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
