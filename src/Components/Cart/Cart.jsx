import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCart,
  editItemFromCart,
  removeItemFromCart,
  checkCartHasItems,
} from "../../store/redusers/cartCreator";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, cartStatus, cartError } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCart());
  }, [dispatch]);

  const total = cart.reduce((acc, item) => acc + item.total, 0);

  const renderItems = (cartItem, idx) => {
    const { title, count, total, id } = cartItem;

    const onRemoveItem = (id) => {
      dispatch(removeItemFromCart(id));
    };
    const onAddToCart = () => dispatch(editItemFromCart({ id, count: 1 }));
    const onRemoveFromCart = () =>
      dispatch(editItemFromCart({ id, count: -1 }));

    return (
      <tr key={`item-${id}`}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>{total}$</td>
        <td>
          <Button
            variant="outline-success"
            className={classes.addButton}
            onClick={onAddToCart}
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
          <Button
            variant="outline-warning"
            className={classes.removeButton}
            onClick={onRemoveFromCart}
          >
            <i className="fa-solid fa-minus"></i>
          </Button>
          <Button
            variant="outline-danger"
            className={classes.removeButton}
            onClick={() => onRemoveItem(id)}
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>В корзине:</h2>
      {cartStatus === "pending" && "...loading"}
      {cartStatus === "rejected" && cartError}
      {cartStatus === "fulfilled" &&
        (checkCartHasItems(cart) ? (
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Item</th>
                <th>Count</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>{cart.map(renderItems)}</tbody>
          </Table>
        ) : (
          <p className={classes.emptyCartMessage}>Ваша корзина пуста</p>
        ))}
      <p className={classes.total}>Total: ${total}</p>
      <Link className={classes.link} to={"/"}>
        Back
      </Link>
    </div>
  );
};

export default Cart;
