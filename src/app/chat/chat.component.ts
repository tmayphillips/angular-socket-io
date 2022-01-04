import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //users = ['jacob','smitha'];
  messages:any = []
  constructor(private socketService:SocketService) { }

  ngOnInit(): void {
    this.socketService.setupSocket();
    this.socketService.setUser();
    of(this.socketService.messages).subscribe((data)=> this.messages = data)
  }
  sendTest(){
    this.socketService.sendMessage('x','y','hi there')
  }
}
