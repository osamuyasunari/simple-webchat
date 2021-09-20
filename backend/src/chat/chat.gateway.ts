import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { BehaviorSubject } from 'rxjs'
import { Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

interface TypingMessage {
  type: 'start' | 'stop'
  username: string
}

interface User {
  username: string
  messagesCount: number
  uuid?: string
  timestamp?: string
}

interface Message {
  message: string
  user: string
  timestamp?: string
  uuid?: string
}


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server
  users: User[] = []
  users$: BehaviorSubject<User[]> = new BehaviorSubject([])

  typings: string[] = []

  constructor() {
    this.users$.subscribe((users: User[]) => {
      if (this.server) this.server.emit('users', users)
    })
  }

  async handleConnection(socket: Socket) {
    if (this.users.length === 500) {
      socket.emit('error', 'Максимум участников, попробуйте позже')
      socket.disconnect()
    }
  }
  
  async handleDisconnect(socket: Socket) {
    const findedIndex = this.users.findIndex((user: User) => socket.data.uuid === user.uuid)
    if (findedIndex !== -1) {
      this.users.splice(findedIndex, 1)
      this.users$.next(this.users)
    }
  }

  @SubscribeMessage('auth')
  async onUsers(socket: Socket, message) {
    const findedUser = this.users.find((user: User) => user.username === message.username)
    if (findedUser) {
      socket.emit('auth', {
        error: 'CHAT-1',
        message: 'Пользователь с таким именем уже существует',
      })
    } else {
      const user = this.registerUser(message.username)
      socket.data.uuid = user.uuid
      socket.emit('auth', user)
    }
  }
  
  @SubscribeMessage('messages')
  async onMessages(socket: Socket, message: Message) {
    const _message = { ...message, timestamp: new Date().toISOString(), uuid: uuidv4() }
    this.server.emit('messages', _message)
  }

  @SubscribeMessage('typing')
  async onTyping(socket: Socket, message: TypingMessage) {
    switch(message.type) {
      case 'start':
        const findedUsername = this.typings.find((username: string) => username === message.username)
        if (!findedUsername) {
          this.typings.push(message.username)
          socket.broadcast.emit('typing', this.typings)
        }
        break
      case 'stop':
        const findedIndex = this.typings.findIndex((username: string) => username === message.username)
        if (findedIndex !== -1) {
          this.typings.splice(findedIndex, 1)
          socket.broadcast.emit('typing', this.typings)
        }
        break
      default:
        break
    }
  }

  private registerUser(username: string) {
    const timestamp = new Date().toISOString()
    const messagesCount = 0
    const uuid = uuidv4()
    const user = { username, timestamp, messagesCount, uuid }
    this.users.push(user)
    this.users$.next(this.users)
    return user
  }
}