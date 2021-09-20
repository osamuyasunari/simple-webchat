import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

interface setUserAction {
  payload: setUserPayload
  type: string
}

interface setUserPayload {
  user: User
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined as User | undefined,
  },
  reducers: {
    setUser: (state, action: setUserAction) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.user
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
