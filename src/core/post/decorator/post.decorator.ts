import { createParamDecorator } from '@nestjs/common';

import { PostEntity } from '../post.entity';

export const GetPost = createParamDecorator(
  async (data: string, context): Promise<PostEntity> => {
    const post: PostEntity = context.switchToHttp().getRequest().post;

    return data ? post && post[data] : post;
  },
);
