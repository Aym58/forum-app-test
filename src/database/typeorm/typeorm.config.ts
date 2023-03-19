import { ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from 'src/core/user/user.entity';
import { PostEntity } from 'src/core/post/post.entity';

config();
const configService = new ConfigService();

const Entities = [UserEntity, PostEntity];

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DEV_DB_URI'),
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: true,
};
