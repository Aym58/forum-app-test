import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from '../user.entity';

export const GetUser = createParamDecorator(
  async (data: string, context): Promise<UserEntity> => {
    const user: UserEntity = context.switchToHttp().getRequest().user;

    return data ? user && user[data] : user;
  },
);
