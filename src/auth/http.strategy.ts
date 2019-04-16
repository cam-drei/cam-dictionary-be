import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService, JWTAuth } from './token.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string): Promise<JWTAuth> {
    try {
      const user = await TokenService.decode(token);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
