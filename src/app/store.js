import { configureStore } from "@reduxjs/toolkit";
import userReducer from "app/slices/userSlice";

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
