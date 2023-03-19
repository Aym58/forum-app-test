import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostModule } from './core/post/post.module';
import { UserModule } from './core/user/user.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
