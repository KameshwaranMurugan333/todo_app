import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { todoService } from "./services/todoServices";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        [todoService.reducerPath]: todoService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(todoService.middleware),
})