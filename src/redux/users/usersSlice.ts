import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getUsersList } from './usersAPI'
import { IUser, IUsersState, LoadingStatuses } from './types'

const initialState: IUsersState = {
  usersList: [],
  hidedUsers: [],
  searchQuery: '',
  usersLoadingStatus: LoadingStatuses.loading,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    hideUser: (state, action: PayloadAction<number>) => {
      state.hidedUsers.push(action.payload)
    },
    resetUsers: (state) => {
      state.hidedUsers = []
      state.searchQuery = ''
    },
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setActiveUser: (state, action: PayloadAction<IUser>) => {
      state.activeUser = action.payload
    },
    removeActiveUser: (state) => {
      delete state.activeUser
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadingStatus = LoadingStatuses.loading
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.usersLoadingStatus = LoadingStatuses.loaded
        state.usersList = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadingStatus = LoadingStatuses.error
      })
  },
})

export const { hideUser, resetUsers, changeSearchQuery, setActiveUser, removeActiveUser } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.usersList
export const selectHidedUsers = (state: RootState) => state.users.hidedUsers
export const selectUsersLoadingStatus = (state: RootState) => state.users.usersLoadingStatus
export const selectSearchQuery = (state: RootState) => state.users.searchQuery
export const selectActiveUser = (state: RootState) => state.users.activeUser

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
      try {
        return await getUsersList()
      } catch (err) {
        return rejectWithValue(err)
      }
    }
)

export default usersSlice.reducer
