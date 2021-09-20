import React from 'react'
import { Message as MessageType } from '../../../../types'

import { formatTimestamp } from '../../../../utils/lib'

import styles from './styles.module.scss'

interface MessageProps {
  message: MessageType
  first: boolean
  self: boolean
}

function Message(props: MessageProps): any {
  const { message, first, self } = props
  return (
    <div className={`${styles['message-wrapper']} ${self ? styles.self : ''}`}>
      <div className={`${styles.message} ${self ? styles['self-message'] : styles['not-self-message']} ${first ? styles['first-message'] : ''}`}>
        <div className={styles.text}>
          <span>{message.message}</span>
          <span className={styles.spacer} />
        </div>
        <div className={`${styles.timestamp} text-muted`}>
          {formatTimestamp(message.timestamp)}
        </div>
        {
          first
            ? (
              <div className={`${styles.tail} ${self ? styles['self-tail'] : styles['not-self-tail']}`}>
                {
                  self
                    ? (
                      <svg viewBox="0 0 8 13" width="8" height="13">
                        <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                        <path fill="#DCF8C6" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                      </svg>
                    )
                    : (
                      <svg viewBox="0 0 8 13" width="8" height="13">
                        <path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" />
                        <path fill="white" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" />
                      </svg>
                    )
                }
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}

export default Message
