import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { websocketMiddleware } from './middleware/websocket-middleware'
import { wsActions } from './types'

const feedWebsocketMiddleware = websocketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedWebsocketMiddleware)
  }
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch