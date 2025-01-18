import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('UserDecorator');
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(ctx);
      const request = gqlContext.getContext().req;
      logger.log({ request: request.user });
      return request.user;
    }
  },
);
