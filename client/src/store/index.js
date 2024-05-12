/** @format */

import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: (getDeafMiddleware) => {
    return getDeafMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
