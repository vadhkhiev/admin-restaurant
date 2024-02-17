import { configureStore } from '@reduxjs/toolkit'
import { rootReducers } from './combineReducer'

export default configureStore({
  reducer: rootReducers
})