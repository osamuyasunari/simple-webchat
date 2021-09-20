import { BehaviorSubject, Subject } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { Message, User, TypingMessage } from '../types'

class Client {
  host = ''

  socket?: Socket

  messages$: Subject<Message> = new Subject()

  users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[])

  errors$: Subject<any> = new Subject()

  typing$: Subject<string[]> = new Subject()

  private static instance?: Client

  static createInstance() {
    if (Client.instance) {
      return Client.instance
    }
    Client.instance = new this()
    return Client.instance
  }

  static getInstance() {
    return this.createInstance()
  }

  init(host: string) {
    this.host = host
    if (!this.socket) {
      this.socket = io(this.host)
      this.initHandlers()
    }
  }

  sendMessage(message: Message, username: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('typing', { type: 'stop', username })
      this.socket.emit('messages', message)
    }
  }

  sendTypingMessage(message: TypingMessage) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('typing', message)
    }
  }

  auth(username: string) {
    if (this.socket) {
      const authSubscription = new BehaviorSubject(undefined)
      this.socket.emit('auth', { username })
      this.socket.on('auth', (data: any) => {
        authSubscription.next(data)
      })
      return authSubscription
    }
    return undefined
  }

  close() {
    if (this.socket) this.socket.close()
  }

  private initHandlers() {
    if (this.socket) {
      this.socket.on('messages', (data: any) => {
        this.messages$.next(data)
      })
      this.socket.on('users', (data: any) => {
        this.users$.next(data)
      })
      this.socket.on('typing', (data: string[]) => {
        this.typing$.next(data)
      })
      this.socket.on('error', (data: any) => {
        this.errors$.next(data)
      })
    }
  }
}

export default Client
