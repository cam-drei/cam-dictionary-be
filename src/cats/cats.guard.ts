import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CatsGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    // const ctx = GqlExecutionContext.create(context);
    return true;
  }
}
