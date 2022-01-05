import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { SocketService } from '../socket.service';
import { Message } from '../message';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user:string = '';
  users:string[] = []
  messages:Message[] = []
  room:string = '';
  
  color:string = "hsl(" + Math.random() * 360 + ", 100%, 75%)"

  constructor(private socketService:SocketService) { 
  }

  ngOnInit(): void {
    this.socketService.setupSocket();
    of(this.socketService.messages).subscribe((data)=> {
      this.messages = data
    })
  }

  createUser(user:string) {
    this.user = user
    this.socketService.setUser(user)
    of(this.socketService.users).subscribe((data)=> {
      this.users = data
    })
  }

  enterChat(form:NgForm){
    this.createUser(form.value.user);
  }

  sendMessage(msgText:string) {
    this.socketService.sendMessage(this.room, this.user, msgText)
  }
}


