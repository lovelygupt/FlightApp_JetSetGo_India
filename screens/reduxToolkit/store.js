import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flightDetailsSlice from './flightDetailsSlice';

const combinedReducer = combineReducers({
 flight:flightDetailsSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
