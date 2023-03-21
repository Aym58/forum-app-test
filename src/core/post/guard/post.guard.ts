import {
  BadRequestException,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from '../post.entity';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    @InjectRepository(PostEntity)
    private PostRepository: Repository<PostEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const postId = params.id;

    if (!postId) {
      throw new BadRequestException('Post Guard Error');
    }

    const post = await this.PostRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    request.post = post;

    return true;
  }
}
