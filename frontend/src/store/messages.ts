import { createSlice } from '@reduxjs/toolkit'
import { Message } from '../types'

interface appendMessageAction {
  payload: appendMessagePayload
  type: string
}

interface appendMessagePayload {
  message: Message
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [] as any[],
  },
  reducers: {
    appendMessage: (state, action: appendMessageAction) => {
      // eslint-disable-next-line no-param-reassign
      state.messages.push(action.payload.message)
      if (state.messages.length > 100) state.messages.shift()
    },
    deleteMessage: (state, action) => {
      const findedIndex = state.messages.findIndex((message: any) => message.id === action.payload.id)
      if (findedIndex !== -1) {
        state.messages.splice(findedIndex, 1)
      }
    },
  },
})

export const { appendMessage, deleteMessage } = messagesSlice.actions
export default messagesSlice.reducer
