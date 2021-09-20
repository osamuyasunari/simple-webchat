import React from 'react'

import styles from './styles.module.scss'

interface TypingIndicatorProps {
  username: string
}

function TypingIndicator(props: TypingIndicatorProps): any {
  const { username } = props
  return (
    <div className={`${styles['message-wrapper']} text-muted`}>
      <div className={styles.message}>
        <div className={styles.text}>
          <span className={styles.typing}>{`${username} печатает`}</span>
          <span className={styles.spacer} />
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
