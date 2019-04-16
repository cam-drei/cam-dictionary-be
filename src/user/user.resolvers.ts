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

@Resolver('User')
export class UserResolvers {
  private readonly logger = new Logger(UserResolvers.name);
  constructor(private readonly userService: UserService) {}

  @Query('user')
  @UseGuards(GqlAuthGuard)
  async getUserProfile(@Context() context: any): Promise<User> {
    const { user } = context.req;
    this.logger.log(`Get user profile with Id:${user.id}`);
    const response = await this.userService.getProfileById(user.id);
    this.logger.log(`User: ${JSON.stringify(response)}`);
    return response;
  }

  @Mutation('updateUser')
  @UseGuards(GqlAuthGuard)
  async updateUserProfile(
    @Context() context: any,
    @Args('user')
    userUpdateData: UpdateUserInput,
  ): Promise<User> {
    const { user } = context.req;
    this.logger.log(`Update user profile with Id:${user.id}`);

    const updatedUser = await this.userService.updateUserProfile(
      user.id,
      userUpdateData,
    );

    this.logger.log(`User: ${JSON.stringify(updatedUser)}`);

    return updatedUser;
  }
}
