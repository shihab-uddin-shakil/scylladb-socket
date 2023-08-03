
import { Module } from '@nestjs/common';
import { CassandraModule } from './common/cassandra/cassandra.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CassandraModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }