import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class ListenersGateway implements OnModuleInit {
  constructor() {
    this.socketClient = io('http://localhost:3228');
  }

  public socketClient: Socket;

  onModuleInit() {
    console.log('module initialized .... ');
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('Connected to gateway');
    });

    this.socketClient.on('onMessage', (payload: any) => {
      console.log('payload printing ', payload);
    });
  }
}
