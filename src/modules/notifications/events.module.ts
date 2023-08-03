import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './gateways/events.gateway';
import { ListenersGateway } from './gateways/listeners.gateway';
import { NotificationService } from './services/notification.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [],
  providers: [EventsGateway, ListenersGateway, NotificationService],
  exports: [NotificationService],
})
export class EventsModule {}
