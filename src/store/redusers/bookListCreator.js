import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const fetchAllBooks = createAsyncThunk('BookLIst/fetchAllCart', async (payload, thunkApi) => {
    try {
        const response = await api.getBooks();
        return response.data;
    } catch(err) {
        return thunkApi.rejectWithValue('Sorry, something ahse gone wrrong. try again later');
    }
});

export default fetchAllBooks;