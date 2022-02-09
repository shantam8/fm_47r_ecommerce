import React, { useState, useEffect } from "react";
import "./Cart.css";
import { FaTrashAlt } from "react-icons/fa";

function Cart(props) {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    if (props.cartContent == "") {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [props.cartContent]);

  function handleRemoveItemFromCart(event) {
    props.handleRemoveItemFromCart(event.target.closest("button").value);
  }

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
              {props.cartContent.map((element, index) => {
                //console.log(element);

                if (index % 2 == 0) {
                  //setIsCartEmpty(false);
                  // console.log("mein element");
                  // console.log(props.data.products[element]);

                  let totalPrice =
                    props.data.products[element].price *
                    props.cartContent[index + 1];

                  return (
                    <div
                      className="cart__item"
                      key={props.data.products[element].id}
                    >
                      <img
                        src={props.data.products[element].thumbnails[0]}
                        className="cart__item__thumb"
                      />
                      <p className="cart__item__title">
                        {props.data.products[element].title}
                      </p>
                      <p className="cart__item__pricebar">
                        <span className="cart__item__price">
                          ${props.data.products[element].price}
                        </span>{" "}
                        x
                        <span className="cart__item__amount">
                          {props.cartContent[index + 1]}
                        </span>
                        <span className="cart__item__total">
                          {" "}
                          ${totalPrice.toFixed(2)}
                        </span>
                      </p>
                      <button
                        onClick={handleRemoveItemFromCart}
                        value={element}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  );
                }
              })}

              <button id="btn__checkout">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
