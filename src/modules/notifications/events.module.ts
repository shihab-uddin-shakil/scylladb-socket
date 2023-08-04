import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './gateways/events.gateway';
import { ListenersGateway } from './gateways/listeners.gateway';
import { NotificationService } from './services/notification.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { CassandraModule } from 'nestjs-cassandra';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [],
  providers: [
    EventsGateway,
    ListenersGateway,
    NotificationService,
    UserService,
  ],
  exports: [NotificationService, UserService],
})
export class EventsModule {}
