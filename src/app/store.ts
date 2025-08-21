import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './cart/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();