import { UserService } from './user.service';
import { UseGuards, Logger, ParseIntPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  Query,
  Mutation,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { UpdateUserInput, User } from 'src/graphql.schema';
import { GqlAuthGuard } from 'src/auth/gqlauth.guard';
import { JWTAuth } from 'src/auth/auth.service';

@Resolver('User')
export class UserResolvers {
  private readonly logger = new Logger(UserResolvers.name);
  constructor(private readonly userService: UserService) {}

  @Query('user')
  @UseGuards(GqlAuthGuard)
  async getUserProfile(@Context() context: any): Promise<User> {
    const { user } = context.req;
    this.logger.log('Get user profile with Id:', user.id);
    return await this.userService.getProfileById(user.id);
  }

  @Mutation('updateUser')
  @UseGuards(GqlAuthGuard)
  async updateUserProfile(
    @Context() context: any,
    @Args('user')
    userUpdateData: UpdateUserInput,
  ): Promise<User> {
    const { user } = context.req;
    this.logger.log('update user profile with Id:', user.id);

    const updatedUser = await this.userService.updateUserProfile(
      user.id,
      userUpdateData,
    );

    return updatedUser;
  }
}
