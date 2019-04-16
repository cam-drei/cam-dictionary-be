import { Logger } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

export class JWTAuth {
  id: string;
}
export class TokenService {
  private readonly logger: Logger = new Logger(TokenService.name);

  private static cert: string = `N33cSq4Ne6F6j4A9`;

  public static encode(jwtAuth: JWTAuth): string {
    const token = jwt.sign(jwtAuth, TokenService.cert);

    return token;
  }

  public static decode(token: string): JWTAuth {
    const data: JWTAuth = jwt.verify(token, TokenService.cert) as JWTAuth;
    return data;
  }
}
