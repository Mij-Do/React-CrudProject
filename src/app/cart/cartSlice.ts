import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../interface';

export interface CartState {
    cartItems: IProduct[];
}

const initialState: CartState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
    },
});

export const {} = cartSlice.actions;
export default cartSlice;
