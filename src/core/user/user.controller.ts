import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { GetUser } from './decorator/user.decorator';
import { CreateUserDto, GetUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created',
  })
  @ApiConflictResponse({ description: 'User already exists' })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<GetUserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all Users', type: [GetUserDto] })
  async getAllUsers(): Promise<GetUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get one User', type: GetUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getOneUser(@GetUser() user: UserEntity): Promise<GetUserDto> {
    return this.userService.getOneUser(user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@GetUser() user: UserEntity): Promise<void> {
    return this.userService.deleteUser(user);
  }
}
