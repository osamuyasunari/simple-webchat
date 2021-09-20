/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import IconButton from '@mui/material/IconButton'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import SendIcon from '@mui/icons-material/Send'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import React, { useEffect, useRef, useState } from 'react'

import { fromEvent } from 'rxjs'

import styles from './styles.module.scss'

interface InputFieldProps {
  onSendMessage: (value: string) => void
  onInput: () => void
}

function InputField(props: InputFieldProps): any {
  const { onSendMessage, onInput } = props

  const [pickerOpened, setPicker] = useState(false)
  const [pickerLeft, setPickerLeft] = useState(0)
  const [pickerTop, setPickerTop] = useState(0)

  const textareaRef = useRef() as any
  const emojiRef = useRef() as any

  useEffect(() => {
    const subscription = fromEvent(window, 'resize').subscribe(() => {
      if (emojiRef && emojiRef.current) {
        setPickerLeft(emojiRef.current.offsetLeft)
        setPickerTop(emojiRef.current.offsetTop)
      }
    })
    return () => { subscription.unsubscribe() }
  })

  const handleClick = () => {
    onSendMessage(textareaRef.current.value)
    textareaRef.current.value = ''
  }

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleClick()
    }
  }

  const handleEmojiClick = () => {
    setPicker(!pickerOpened)
    setPickerLeft(emojiRef.current.offsetLeft)
    setPickerTop(emojiRef.current.offsetTop)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    setPicker(false)
    e.stopPropagation()
  }

  const insertIntoInput = (el: any, text: string) => {
    el.focus()
    const elCopy = el
    if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
      const val = el.value
      const selStart = el.selectionStart
      elCopy.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd)
      elCopy.selectionEnd = selStart + text.length
      elCopy.selectionStart = selStart + text.length
    } else if (typeof (document as any).selection !== 'undefined') {
      const textRange = (document as any).selection.createRange()
      textRange.text = text
      textRange.collapse(false)
      textRange.select()
    }
  }

  const addEmoji = (e: any) => {
    insertIntoInput(textareaRef.current, e.native)
  }

  return (
    <div className={styles['input-field']}>
      <div
        className={`${styles.backdrop} ${!pickerOpened ? styles.hidden : ''}`}
        onClick={handleBackdropClick}
      />
      <IconButton
        disableRipple
        ref={emojiRef}
        color={pickerOpened ? 'primary' : 'inherit'}
        style={{ backgroundColor: 'transparent' }}
        onClick={handleEmojiClick}
      >
        <InsertEmoticonIcon fontSize="large" />
      </IconButton>
      <div className={pickerOpened ? styles.picker : styles.hidden}>
        <Picker
          style={{
            left: pickerLeft,
            top: pickerTop,
            position: 'fixed',
            zIndex: 2,
            transform: 'translate(0%, -100%)',
          }}
          onSelect={addEmoji}
        />
      </div>
      <div className={styles['textarea-wrapper']}>
        <TextareaAutosize
          ref={textareaRef}
          maxRows={5}
          minRows={1}
          onKeyDown={checkKeyDown}
          onInput={onInput}
          placeholder="Введите сообщение"
        />
      </div>
      <IconButton disableRipple style={{ backgroundColor: 'transparent' }} onClick={handleClick}>
        <SendIcon fontSize="large" />
      </IconButton>
    </div>
  )
}

export default InputField
