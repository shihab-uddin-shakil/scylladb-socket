import { Module } from '@nestjs/common';
import { CassandraModule } from './common/cassandra/cassandra.module';
import { UserModule } from './modules/user/user.module';
import { EventsModule } from './modules/notifications/events.module';

@Module({
  imports: [CassandraModule, UserModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
