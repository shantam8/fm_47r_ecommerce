import React, { useState, useEffect } from "react";

import "./Header.css";

import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import Cart from "./Cart";
import Container from "../utilities/Container";
import Backdrop from "../utilities/Backdrop";

function Header(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [activeLink, setActiveLink] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && window.innerWidth >= 800) {
      handleToggleMobileMenu();
    }
  }, [windowWidth]);

  function handleToggleMobileMenu() {
    setIsMobileMenuOpen((previousState) => !previousState);
  }

  function handleCartToggle() {
    setIsCartOpen((previousState) => !previousState);
  }

  function handleWindowResize() {
    setWindowWidth(window.innerWidth);
  }

  function handleProductSelection(event) {
    setActiveLink(event.target.value)
    if (isMobileMenuOpen){
      handleToggleMobileMenu();
    }
    props.product(event.target.value);
  }

  return (
    <header>
      <Container>
        <div className="header__container">
          <div className="header__container__left">
            {windowWidth < 800 && (
              <button id="btn__mobile-menu" onClick={handleToggleMobileMenu}>
                {!isMobileMenuOpen ? <BiMenu /> : <MdClose />}
              </button>
            )}
            <h1>plushies</h1>
            <nav
              className={`header__nav ${
                isMobileMenuOpen ? "header__nav--menu-open" : ""
              }`}
            >
              <ul>
                <li className={`${activeLink == 0 ? "link--active" : ""}`}>
                  <button value="0" onClick={handleProductSelection}>
                    {props.title[0].title}
                  </button>
                </li>
                <li className={`${activeLink == 1 ? "link--active" : ""}`}>
                  <button value="1" onClick={handleProductSelection}>
                    {props.title[1].title}
                  </button>
                </li>
                <li className={`${activeLink == 2 ? "link--active" : ""}`}>
                  <button value="2" onClick={handleProductSelection}>
                    {props.title[2].title}
                  </button>
                </li>
                <li className={`${activeLink == 3 ? "link--active" : ""}`}>
                  <button value="3" onClick={handleProductSelection}>
                    {props.title[3].title}
                  </button>
                </li>
                <li className={`${activeLink == 4 ? "link--active" : ""}`}>
                  <button value="4" onClick={handleProductSelection}>
                    {props.title[4].title}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__container__right">
            <button id="btn__cart" onClick={handleCartToggle}>
              <BsCart3 />
            </button>
            {isCartOpen && (
              <Cart
                cartContent={props.cartContent}
                data={props.data}
                handleRemoveItemFromCart={props.handleRemoveItemFromCart}
              />
            )}
            <button id="btn__profile"></button>
          </div>
        </div>
      </Container>
      {isMobileMenuOpen && <Backdrop />}
    </header>
  );
}

export default Header;
