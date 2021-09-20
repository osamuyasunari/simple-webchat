import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import React from 'react'

import styles from './styles.module.scss'

interface UserProps {
  user: any
}

function User(props: UserProps): any {
  const { user } = props
  return (
    <div className={styles.user}>
      <div className={styles.info}>
        <AccountCircleIcon />
        <span className={styles.username}>{ user.username }</span>
        <div className="spacer" />
        <div className={styles.online} />
      </div>
    </div>
  )
}

export default User
