import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto, GetUserDto } from './dto/user.dto';
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

  async getAllUsers(): Promise<GetUserDto[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .addOrderBy('user.id', 'ASC')
        .select(['user.id', 'user.name', 'user.email'])
        .getMany();

      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOneUser(user: UserEntity): Promise<GetUserDto> {
    return { id: user.id, name: user.name, email: user.email };
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async deleteUser(user: UserEntity): Promise<void> {
    try {
      const { posts } = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.posts', 'post')
        .where('user.id = :id', { id: user.id })
        .getOne();

      if (posts && posts.length !== 0) {
        throw new Error();
      }
      await user.remove();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
