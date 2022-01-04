import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private url = 'http://localhost:3000'
  private socket: any
  public message$:BehaviorSubject<string> = new BehaviorSubject('')

  constructor() { this.socket = io(this.url) }

  setupSocket = () => {
    this.socket = io(this.url);

    this.socket.on('message', (data:any) => {
      console.log(data);
    });
  }

  sendMessage(room:string, user:string, msg: string) {
    console.log(`room: ${room}, message: ${msg}`)
    this.socket.emit('message', {room: room, msg: msg});
  }

  getMessage() {
    this.socket.on('message data', (message:any) => {
      console.log(message)
      this.message$.next(message)
    })
    return this.message$.asObservable()
  }

}