import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService, JWTAuth } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<JWTAuth> {
    try {
      const user = await this.authService.decode(token);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
