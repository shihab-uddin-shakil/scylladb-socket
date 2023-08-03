import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { SignInOutService } from '@src/modules/signInOut/signInOut.service';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() // @Inject(forwardRef(() => SignInOutService))
  // private readonly signInOutService: SignInOutService
  {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    console.log('gateway disconnected....from handler');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('gateway connected....from handler');
  }
  onModuleInit() {
    this.server.on('connection', (socket) => {
      // console.log("params" , socket.handshake.query)
      // console.log("auth token" , socket.handshake.auth.token)
      // console.log("printing socket id " , socket.id)
      this.sendOnlineMemberNotification(socket);
      socket.on('disconnect', () => {
        console.log('client got disconnected ', socket.id);
      });
    });

    this.server.on('disconnect', () => {
      console.log('client got disconnected ');
    });
    // throw new Error("Method not implemented.");
  }

  private async sendOnlineMemberNotification(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    // const data = await this.signInOutService.getAllSignInOutDurationModified()
    // const data =
    //     await this.signInOutService.signInOutFormattedWithBreakdown();
    // const break_info = await this.signInOutService.getBreakDownInfo(
    //     socket?.handshake?.auth?.token,
    //     socket?.handshake?.auth?.tenant,
    //     socket?.handshake?.auth?.discord_id
    // );
    // socket.send(data);
    // console.log('ssssssssssss ', socket.handshake.auth);
    const data = {
      name: 'hamid',
      reason: 'test',
      res: 'Passed',
    };
    this.server.to(socket.id).emit('onlineMembers', {
      name: 'list of online members',
      content: data,
    });
    // this.server.to(socket.id).emit('breakInfo', {
    //     name: 'list of BreakInfo',
    //     content: break_info?.data,
    // });
    // console.log('ssssssssssss ', break_info);
  }

  /**
   * listens to the events
   */
  @SubscribeMessage('events')
  handleEvent(@MessageBody() body: any) {
    console.log('data from socket ', body);
    this.server.emit('onMessage', {
      msg: 'new msg',
      content: 'body',
    });
    // socket.to(senderSocketId).emit("receive-message" , "personal message")
    return 'getting from server';
  }
}
