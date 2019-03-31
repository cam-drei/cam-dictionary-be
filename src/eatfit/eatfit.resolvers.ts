import { EatFitService } from './eatfit.service';
import { UseGuards, Logger, ParseIntPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  Query,
  Mutation,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gqlauth.guard';
import { JWTAuth } from 'src/auth/auth.service';
import { EatFit } from 'src/graphql.schema';
import { UserService } from '../user/user.service';

@Resolver('EatFit')
export class EatFitResolvers {
  private readonly logger = new Logger(EatFitResolvers.name);
  constructor(
    private readonly eatFitService: EatFitService,
    private readonly userService: UserService,
  ) {}

  @Query('generateEatFit')
  @UseGuards(GqlAuthGuard)
  async generateEatFit(@Context() context: any): Promise<EatFit> {
    this.logger.log('Generate eatFit');
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);
    return this.eatFitService.generateEatFit(userProfile);
  }
}
