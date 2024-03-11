import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { setCart } from '../slices/CartSlices';
import { createItem, updateItems } from "../../helpers";

export const fetchAllCart = createAsyncThunk('Cart/fetchAll', async (payload, thunkApi) => {
    try {
        const response = await api.getCart();
        return response.data;
    } catch (err) {
        return thunkApi.rejectWithValue('Failed to fetch. Please try again later');
    }
});

export const editItemFromCart = createAsyncThunk('Cart/addItem', async (payload, thunkApi) => {
    try {
        const { books } = thunkApi.getState().bookList;
        const { cart } = thunkApi.getState().cart;
        const book = books.find(({ id }) => id === payload.id);
        const item = cart.find(({ id }) => id === payload.id);
        const newItem = createItem(book, item, payload.count);
        
        const cartItems = await updateItems(cart, item, newItem);
        thunkApi.dispatch(setCart(cartItems));
    } catch (err) {
        return thunkApi.rejectWithValue('Something has gone wrong.');
    }
});

export const removeItemFromCart = createAsyncThunk('Cart/removeItem', async (id, thunkApi) => {
    try {
        const { cart } = thunkApi.getState().cart;
       
        await api.deleteCartItem(id);
        const updatedCart = cart.filter(item => item.id !== id);
        thunkApi.dispatch(setCart(updatedCart));
        return updatedCart;
    } catch (err) {
        return thunkApi.rejectWithValue('Failed to remove item from cart.');
    }
});

export const checkCartHasItems = (cart) => {
    return cart.length > 0;
};

export default fetchAllCart;
