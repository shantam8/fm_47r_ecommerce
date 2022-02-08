import React, { useState } from "react";
import "./Cart.css";
import { FaTrashAlt } from "react-icons/fa";

function Cart() {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  return (
    <div>
      <div className="cart">
        <div className="cart__title">
          <h3>Cart</h3>
        </div>
        <div className="cart__content">
          {isCartEmpty && <h3>Your cart is empty.</h3>}

          {!isCartEmpty && (
            <div className="cart__content__container">
              <div className="cart__item">
                <div className="cart__item__thumb" />
                <p className="cart__item__title">Autumn Limited Edition</p>
                <p className="cart__item__pricebar">
                  <span className="cart__item__price">$125.00</span> x
                  <span className="cart__item__amount">10</span>  
                  <span className="cart__item__total">$375.00</span>
                </p>
                <FaTrashAlt />
              </div>
              <button className="button__cta">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
