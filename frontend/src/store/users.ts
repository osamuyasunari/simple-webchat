import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

interface setUsersAction {
  payload: setUsersPayload
  type: string
}

interface setUsersPayload {
  users: User[]
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
  },
  reducers: {
    setUsers: (state, action: setUsersAction) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload.users
    },
  },
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
