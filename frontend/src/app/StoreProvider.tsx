'use client'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)
  
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider