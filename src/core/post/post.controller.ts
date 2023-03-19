import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UseFilters,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { GetPost } from './decorator/post.decorator';
import { CreatePostDto, GetPostDto } from './dto/post.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Post')
@Controller('post')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Post created',
  })
  async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all Posts',
    type: [GetPostDto],
  })
  async getAllPosts(
    @Query() { page = 1, limit = 25 }: PaginationDto,
  ): Promise<PostEntity[]> {
    return this.postService.getAllPosts({ page, limit });
  }

  @Delete([':id'])
  @ApiOkResponse({ description: 'Post deleted' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async deletePost(@GetPost() Post: PostEntity): Promise<void> {
    return this.postService.deletePost(Post);
  }
}
