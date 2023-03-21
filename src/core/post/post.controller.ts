import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UseFilters,
  Query,
  UseGuards,
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
import { PostGuard } from './guard/post.guard';
import { RecaptchaGuard } from './guard/recaptcha.guard';

@ApiTags('Post')
@Controller('post')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(RecaptchaGuard)
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
  async getPostList(
    @Query() { page = 1, limit = 25 }: PaginationDto,
  ): Promise<PostEntity[]> {
    return this.postService.getPostList({ page, limit });
  }

  @Get([':id'])
  @UseGuards(PostGuard)
  @ApiOkResponse({
    description: 'Get replies to post',
    type: [GetPostDto],
  })
  async getReplies(
    @GetPost() post: PostEntity,
    @Query() { page = 1, limit = 25 }: PaginationDto,
  ): Promise<PostEntity[]> {
    return this.postService.getReplies(post, { page, limit });
  }

  @Delete([':id'])
  @UseGuards(PostGuard)
  @ApiOkResponse({ description: 'Post deleted' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async deletePost(@GetPost() post: PostEntity): Promise<void> {
    return this.postService.deletePost(post);
  }
}
