import React from 'react'
import ForumIcon from '@mui/icons-material/Forum'
import { Link } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import MenuIcon from '@mui/icons-material/Menu'
import { isMobile, MobileView } from 'react-device-detect'

import styles from './styles.module.scss'

interface ToolbarProps {
  onMenuClick: () => void
}

function Toolbar(props: ToolbarProps): any {
  const { onMenuClick } = props

  return (
    <div className={styles.toolbar}>
      <MobileView>
        <MenuIcon onClick={onMenuClick} />
      </MobileView>
      <Link to="/" className={styles['link-wrapper']}>
        <div className={styles.logo}>
          { isMobile ? '' : <ForumIcon /> }
          <span>&nbsp;simple_webchat</span>
        </div>
      </Link>
      <div className="spacer" />
      <div className={styles.links}>
        <a href="https://github.com/osamuyasunari/simple-webchat" className={styles['link-wrapper']} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://t.me/ohayo_ohayo" className={styles['link-wrapper']} target="_blank" rel="noreferrer">
          <TelegramIcon />
        </a>
        <a href="mailto:vsevolodanisimov@mail.ru" className={styles['link-wrapper']} target="_blank" rel="noreferrer">
          <AlternateEmailIcon />
        </a>
      </div>
    </div>
  )
}

export default Toolbar
