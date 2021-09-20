import React from 'react'

import User from '../User'

import styles from './styles.module.scss'

interface UsersProps {
  users: any[]
}

function Users(props: UsersProps): any {
  const { users } = props
  return (
    <div className={styles.users}>
      {
        users.map((user) => <User key={user.username} user={user} />)
      }
    </div>
  )
}

export default Users
