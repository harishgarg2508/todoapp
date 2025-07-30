  import { configureStore, combineReducers } from '@reduxjs/toolkit';
  import {
    persistStore,
    persistReducer,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'; 

  import userReducer from '@/app/redux/slices/user.slice';
  import taskReducer from '@/app/redux/slices/task.slice';
  import searchUsersReducer from '@/app/redux/slices/getAssigne.slice'; 
  const rootReducer = combineReducers({
    user: userReducer,
    task:taskReducer,
    userSearch: searchUsersReducer, 
  });

  export type RootState = ReturnType<typeof rootReducer>;

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], 
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  };

  export type AppStore = ReturnType<typeof makeStore>['store'];
  export type AppDispatch = AppStore['dispatch'];
