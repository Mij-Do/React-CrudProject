import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../interface';
import { addToCart } from '../../utils/functions';

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
        addToCartAction: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = addToCart(state.cartItems, action.payload);
        }
    },
});

export const {addToCartAction} = cartSlice.actions;
export default cartSlice;
