import React from "react";
import { Button } from "react-bootstrap";
import classes from "./BookList.module.css";


const BookListItem = ({ book, addToCart }) => {
  const { imgUrl, id, title, price, author } = book;
  const onAddToCart = () => addToCart(id);

  return (
    <div className={classes.list_item}>
      <div className={classes.list_item_cover}>
        <img src={imgUrl} alt="book" />
      </div>

      <div className={classes.list_item_details}>
        <h4>{title}</h4>
        <div>{author}</div>
        <div className={classes.list_item_price}>
          <p>$ {price}</p>
          <button className={classes.add_to_cart_button} onClick={onAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
