import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { Messages } from './enum/messages.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email } = createUserDto;
    const alreadyExists = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    console.log(alreadyExists);

    if (alreadyExists) {
      throw new ConflictException(Messages.ALRESDY_EXISTS);
    }

    try {
      const user = new UserEntity();
      user.name = name.toLowerCase();
      user.email = email.toLowerCase();

      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
}
