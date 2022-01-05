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

  constructor() {  }
  messages:Message[] = [];
  users:string[] = []
  allUsers:string[] = [];

  setupSocket = () => {
    this.socket = io(this.url);

    this.socket.on('message data', (data:Message) => {
      this.messages.push(data)
      console.log(data);
    });
//new
    // this.socket.on('all users', (data:string[]) => {
    //   this.allUsers = data
    //   console.log(this.allUsers);
    // });

    this.socket.on('new user', (data:string) => {
      this.users.push(data)
    });

  }
  sendMessage(room:string, user:string, msg: string) {
    const newMsg = new Message(room,user,msg);
    this.socket.emit('message', newMsg);
  }

  setUser(user:string) {
    this.socket.emit('set user', user);
  }

  getMessage() {
    this.socket.on()
    return this.socket.fromEvent('message').pipe(map((data:any) => data.msg));
  }

}
