import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { map } from 'rxjs/operators';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:1978'
  private socket: any
 names = ['bob', 'gina', 'anil', 'nguyen', 'lupita', 'colin', 'dole'];
  constructor() {  }
  messages:Message[] = [];
  setupSocket = () => {
    this.socket = io(this.url);

    this.socket.on('message data', (data:Message) => {
      this.messages.push(data)
      console.log(data);
    });

  }
  sendMessage(room:string, user:string, msg: string) {
    const newMsg = new Message(room,user,msg);
    this.socket.emit('message', newMsg);
  }
  setUser() {
    this.socket.emit('set user', this.names[Math.floor(Math.random()*this.names.length)]);
  }

  getMessage() {
    this.socket.on()
    return this.socket.fromEvent('message').pipe(map((data:any) => data.msg));
  }

}
