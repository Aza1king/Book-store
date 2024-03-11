import { createSlice } from '@reduxjs/toolkit'
import fetchAllCart from '../redusers/cartCreator';

const initialState = {
    cart: [],
    cartStatus: 'pending',
    cartError: '',
};

const cartSlice = createSlice({
    initialState,
    name: 'Cart',
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCart.pending, (state, action) => {
            state.cartStatus = 'pending';
            state.cartError = '';
            state.cart = [];
        });

        builder.addCase(fetchAllCart.fulfilled, (state, action) => {
            state.cartStatus = 'fulfilled';
            state.cart = action.payload;
        });

        builder.addCase(fetchAllCart.rejected, (state, action) => {
            state.cartStatus = 'rejected';
            state.cart = action.payload;
        });
    }
})

const cartReducer = cartSlice.reducer;
export const { setCart } = cartSlice.actions;

export default cartReducer;
