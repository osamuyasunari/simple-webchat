import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { Message as MessageType } from '../../../../types'
import Message from '../Message'
import TypingIndicator from '../TypingIndicator'

import styles from './styles.module.scss'

interface MessagesProps {
  messages: MessageType[]
  typing: string[]
}

function Messages(props: MessagesProps): any {
  const { messages, typing } = props
  const messagesRef = useRef() as any
  let previousMessage: boolean | undefined
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages.slice(-1)[0]
      const self = user && lastMessage.user === user.uuid
      if (messagesRef && messagesRef.current && self) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    }
  }, [messages, user])

  return (
    <div className={styles.messages} ref={messagesRef}>
      {
        messages.map((message) => {
          const self = user ? message.user === user.uuid : false
          const first = previousMessage === undefined || previousMessage !== self
          previousMessage = self
          return <Message key={message.uuid} message={message} first={first} self={self} />
        })
      }
      {
        typing.map((username: string) => {
          const self = user ? username === user.username : false
          return !self ? <TypingIndicator key={username} username={username} /> : false
        })
      }
    </div>
  )
}

export default Messages
