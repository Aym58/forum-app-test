import { ApiProperty } from '@nestjs/swagger/dist';

import { IsNotEmpty, IsNumber, IsEmail, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'johnmail@gmail.com', description: 'User email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    description: 'Post text',
  })
  text: string;
}

export class GetPostDto {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    description: 'Post text',
  })
  text: string;

  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;
}
