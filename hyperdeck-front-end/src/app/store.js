import { configureStore } from "@reduxjs/toolkit";
import hyperdeckSlice from "../features/hyperdeck/hyperdeckSlice.js";

const store = configureStore({
  reducer: {
    hyperdeck: hyperdeckSlice,
  },
});

export default store;