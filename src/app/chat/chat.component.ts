import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
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
  users:string[] = []
  // msgText:string = '';
  messages:Message[] = []
  room:string = '';


  constructor(private socketService:SocketService) { 
  }

  ngOnInit(): void {
    this.socketService.setupSocket();
    of(this.socketService.messages).subscribe((data)=> {
      console.log(data)
      this.messages = data
    })
  }

  createUser(user:string) {
    this.user = user
    this.socketService.setUser(user)
    of(this.socketService.users).subscribe((data)=> {
      console.log(data)
      this.users = data
      console.log(this.users)
    })
  }


  sendMessage(msgText:string) {
    this.socketService.sendMessage(this.room, this.user, msgText)
  }
}


