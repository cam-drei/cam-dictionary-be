import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthData } from 'src/graphql.schema';

@Resolver('Auth')
export class AuthResolvers {
  private readonly logger = new Logger(AuthResolvers.name);

  @Mutation('verifyToken')
  async verifyToken(@Args('token') token: string): Promise<AuthData> {
    this.logger.log({ token });
    return undefined;
  }
}
