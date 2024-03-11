import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import fetchAllBooks from '../../store/redusers/bookListCreator';
import { editItemFromCart } from '../../store/redusers/cartCreator';
import BooksListItem from './BookListItem';

const BookList = () => {
    const { books, booksError, booksStatus } = useSelector((state) => state.bookList);
    const dispatch = useDispatch();
    const onAddToCart = (id) => dispatch(editItemFromCart({ id, count: 1 }));

    useEffect(() => {
        dispatch(fetchAllBooks());
    }, []);

    const booksCases = {
        pending: 'loading...',
        fulfilled: books?.map((book) => <BooksListItem key={book.id} addToCart={onAddToCart} book={book} />),
        rejected: booksError,
    };

    return <div>{booksCases[booksStatus]}</div>;
};

export default BookList;
