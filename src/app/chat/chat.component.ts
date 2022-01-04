import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import * as io from 'socket.io-client';
import { Message } from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user:string = '';
  users:string[] = ['jacob', 'tiffany', 'pato']
  // msgText:string = '';
  messages:string[] = []
  room:string = '';


  constructor(private socketService:SocketService) { 
  }

  ngOnInit(): void {
    this.socketService.setupSocket();
    // this.socketService.setUser();

    this.socketService.getMessage().subscribe((message:any) => {
      console.log(message);
      this.messages.push(message.message);
    })
  }


  sendMessage(msgText:string) {
    this.socketService.sendMessage(this.room, this.user, msgText)
  }
}


