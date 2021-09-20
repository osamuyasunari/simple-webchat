import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'

import Toolbar from '../../components/Toolbar'
import Messages from './components/Messages'
import Users from './components/Users'
import InputField from './components/InputField'

import styles from './styles.module.scss'
import { setUsers } from '../../store/users'
import { appendMessage } from '../../store/messages'
import { RootState } from '../../store'
import Client from '../../client/client'
import { Message, User } from '../../types'

function Chat(): any {
  const [typingTimer, setTypingTimer] = useState()
  const [menuOpened, setMenuOpened] = useState(false)
  const [typing, setTyping] = useState([] as string[])
  const messages = useSelector((state: RootState) => state.messages.messages)
  const users = useSelector((state: RootState) => state.users.users)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const clientService = Client.getInstance()

  useEffect(() => {
    const subscription = clientService.messages$.subscribe((message: Message) => { dispatch(appendMessage({ message })) })
    return () => { subscription.unsubscribe() }
  }, [clientService.messages$, dispatch])

  useEffect(() => {
    const subscription = clientService.users$.subscribe((dUsers: User[]) => { dispatch(setUsers({ users: dUsers })) })
    return () => { subscription.unsubscribe() }
  }, [clientService.users$, dispatch])

  useEffect(() => {
    const subscription = clientService.typing$.subscribe((lTyping: string[]) => { setTyping(lTyping) })
    return () => { subscription.unsubscribe() }
  }, [clientService.typing$])

  const onSendMessage = (text: string) => {
    if (text.trim().length === 0) return
    if (user && user.uuid) {
      const { uuid } = user
      const message = { user: uuid, message: text, username: user.username }
      clientService.sendMessage(message)
    }
  }

  const onInput = () => {
    if (typingTimer !== undefined) {
      clearInterval(typingTimer)
    } else {
      clientService.sendTypingMessage({ type: 'start', username: user ? user.username : '' })
    }

    const timer = setTimeout(() => {
      clientService.sendTypingMessage({ type: 'stop', username: user ? user.username : '' })
      setTypingTimer(undefined)
    }, 1000)
    setTypingTimer(timer as any)
  }

  const onMenuClick = () => {
    setMenuOpened(!menuOpened)
  }

  return (
    <div className={styles.chat}>
      <div className={styles['toolbar-wrapper']}>
        <Toolbar onMenuClick={onMenuClick} />
      </div>
      <div className={styles.content}>
        <div className={styles['left-pane']}>
          <Messages messages={messages} typing={typing} />
          <InputField onSendMessage={onSendMessage} onInput={onInput} />
        </div>
        <div className={!isMobile ? styles['right-pane'] : `${styles['mobile-users']} ${menuOpened ? styles.opened : ''}`}>
          <Users users={users} />
        </div>
      </div>
    </div>
  )
}

export default Chat
