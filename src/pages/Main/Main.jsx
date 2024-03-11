import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import fetchAllCart from "../../store/redusers/cartCreator";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import classes from "./Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAllCart());
  }, []);

  
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <header className={classes.mainheader}>
        <div className={classes.logo}>Main</div>
        {isHomePage && (
          <div className={classes["cart-link"]}>
            <Link to="/cart" className={classes.cart}>
              <FontAwesomeIcon icon={faOpencart} className={classes["cart-icon"]} />
              <span className={classes["cart-count"]}>{cart.length}</span>
            </Link>
          </div>
        )}
        <Outlet />
      </header>
    </div>
  );
};

export default Main;
