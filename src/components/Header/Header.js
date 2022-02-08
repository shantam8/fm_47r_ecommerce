import React, { useState, useEffect } from "react";

import "./Header.css";

import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import logo from "../../images/logo.svg";
import Cart from "./Cart";
import Container from "../utilities/Container";
import Backdrop from "../utilities/Backdrop";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

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
            <img src={logo} />
            <nav
              className={`header__nav ${
                isMobileMenuOpen ? "header__nav--menu-open" : ""
              }`}
            >
              <ul>
                <li>
                  <a href="#">Collections</a>
                </li>
                <li>
                  <a href="#">Men</a>
                </li>
                <li>
                  <a href="#">Women</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__container__right">
            <button id="btn__cart" onClick={handleCartToggle}>
              <BsCart3 />
            </button>
            {isCartOpen && <Cart />}
            <button id="btn__profile"></button>
          </div>
        </div>
      </Container>
      {isMobileMenuOpen && <Backdrop />}
    </header>
  );
}

export default Header;
