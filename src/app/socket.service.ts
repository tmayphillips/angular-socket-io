import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000'
  private socket: any

  constructor() { this.socket = io(this.url) }
  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data:any) => data.msg));
  }
}
