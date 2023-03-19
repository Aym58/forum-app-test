import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { dataSource } from './typeorm.datasource';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
