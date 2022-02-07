import React, { useState, useEffect } from "react";

import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import logo from "../../images/logo.svg";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleToggleMobileMenu() {
    setIsMobileMenuOpen((previousState) => !previousState);
  }

  function handleWindowResize() {
    setWindowWidth(window.innerWidth);
  }

  return (
    <header>
      <div className="header__container">
        <div className="header__container__left">
          {windowWidth < 800 && (
            <button id="btn__mobile-menu" onClick={handleToggleMobileMenu}>
              {!isMobileMenuOpen ? <BiMenu /> : <MdClose />}
            </button>
          )}
          <img src={logo} />
          <nav className={`header__nav ${isMobileMenuOpen ? "menu-open" : ""}`}>
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
          <button id="btn__cart">
            <BsCart3 />
          </button>
          <button id="btn__profile"></button>
        </div>
      </div>
    </header>
  );
}

export default Header;
