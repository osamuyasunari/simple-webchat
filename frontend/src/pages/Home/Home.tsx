import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import styles from './styles.module.scss'

function Home(): any {
  return (
    <div className={!isMobile ? styles.greet : `${styles.greet} ${styles.mobile}`}>
      <h2>Привет!</h2>
      <span>
        Это демонстрационный проект простого чатрума.
        <br />
        Реализован на следующем стеке:
        <br />
        <ul>
          <li>
            React
          </li>
          <li>
            NestJS
          </li>
        </ul>
        Исходный код доступен на&nbsp;
        <a href="https://github.com/osamuyasunari/simple-webchat">Github</a>
      </span>
      <Link to="/auth">
        <Button variant="contained" color="secondary" style={{ marginTop: '1rem' }}>
          Начать
        </Button>
      </Link>
    </div>
  )
}

export default Home
