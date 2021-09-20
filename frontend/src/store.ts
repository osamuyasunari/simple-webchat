import { configureStore } from '@reduxjs/toolkit'
import userReducer from './store/user'
import usersReducer from './store/users'
import messagesReducer from './store/messages'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
})

export default store
