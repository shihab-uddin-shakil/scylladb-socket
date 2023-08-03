import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/user.repository';
import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from '../notifications/services/notification.service';
import { EventsModule } from '../notifications/events.module';

@Module({
  imports: [CassandraModule, forwardRef(() => EventsModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
