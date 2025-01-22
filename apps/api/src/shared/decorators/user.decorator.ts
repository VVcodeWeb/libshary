import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(ctx);
      const request = gqlContext.getContext().req;
      return request.user;
    }
  },
);
