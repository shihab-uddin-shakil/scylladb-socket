import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../gateways/events.gateway';

@Injectable()
export class NotificationService {
  constructor(private eventGateway: EventsGateway) {}

  async emitOnlineMembers(members) {
    this.eventGateway.server.emit('onlineMembers', {
      name: 'list of online members',
      content: members,
    });
  }
  // async emitBreakInfo(breakInfo) {
  //     this.eventGateway.server.emit('breakInfo', {
  //         name: 'list of BreakInfo',
  //         content: breakInfo?.data,
  //     });
  // }
}
