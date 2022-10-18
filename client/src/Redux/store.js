import { configureStore } from '@reduxjs/toolkit'
import userSlice from './usersSlice'
import animeSlice from './animeSlice'
import commentsSlice from './commentsSlice'

export const store = configureStore({
  reducer: {
    Users:userSlice,
    animes:animeSlice,
    Comments:commentsSlice
  },
})