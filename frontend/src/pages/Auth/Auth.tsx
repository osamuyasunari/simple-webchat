import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Client from '../../client/client'
import { setUser } from '../../store/user'

import styles from './styles.module.scss'

function Auth(): any {
  const [username, setSelfUsername] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const clientService = Client.getInstance()

  const auth = (pUsername: string) => {
    const auth$ = clientService.auth(pUsername)
    if (auth$) {
      const authSubscription = auth$.subscribe((res: any) => {
        if (res) {
          if (res.error) {
            localStorage.removeItem('username')
            setError(res.message)
            authSubscription.unsubscribe()
          } else {
            localStorage.setItem('username', pUsername)
            dispatch(setUser({ user: res }))
            history.push('/chat')
            authSubscription.unsubscribe()
          }
        }
      })
    }
  }

  useEffect(() => {
    const lcUsername = localStorage.getItem('username')
    if (lcUsername) auth(lcUsername)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      setError('Псевдоним не может быть пустым')
      return
    }
    if (username.length > 8) {
      setError('Псевдоним не может быть больше 8 символов')
      return
    }
    auth(username)
  }

  return (
    <form onSubmit={handleSubmit} className={isMobile ? styles.mobile : ''}>
      <h2>Представьтесь, пожалуйста</h2>
      <TextField
        fullWidth
        value={username}
        variant="standard"
        error={!!error.length}
        helperText={error}
        label="Ваш псевдоним"
        autoComplete="off"
        onChange={(e) => { setSelfUsername(e.target.value); setError('') }}
      />
      <Button className={styles['submit-button']} type="submit" color="secondary" variant="contained">Продолжить</Button>
    </form>
  )
}

export default Auth
