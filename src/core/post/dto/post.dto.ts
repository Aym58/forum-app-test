import { ApiProperty } from '@nestjs/swagger/dist';

import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'http://ru.wikipedia.org/',
    description: 'Home Page URL',
  })
  homePage?: string;

  @ApiProperty({ example: 10, description: 'Id of commented post' })
  parentId?: number;

  @ApiProperty({
    description: 'Recaptcha token',
  })
  recaptchaValue: string;
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

  @IsUrl()
  @ApiProperty({
    example: 'http://ru.wikipedia.org/',
    description: 'Home Page URL',
  })
  homePage?: string;

  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;

  @ApiProperty({ example: 10, description: 'Id of commented post' })
  parentId?: number;
}
