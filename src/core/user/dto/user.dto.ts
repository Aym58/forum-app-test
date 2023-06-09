import { ApiProperty } from '@nestjs/swagger/dist';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'johnmail@gmail.com', description: 'User email' })
  email: string;
}
