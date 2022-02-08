import React, { useState, useEffect } from "react";
import "./Product.css";

import { BsCart3 } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import image1 from "../images/image-product-1.jpg";
import image2 from "../images/image-product-2.jpg";
import image3 from "../images/image-product-3.jpg";
import image4 from "../images/image-product-4.jpg";

function Product() {
  const [isDesktopWidth, setIsDesktopWidth] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentImageTransitionClass, setCurrentImageTransitionClass] =
    useState("product__main-image--scrollTo0");

  function handleImageScroll(event) {
    let value = event.target.closest("button").value;
    if (value === "left" && currentImage > 0) {
      setCurrentImage((previousState) => previousState - 1);
    }
    if (value === "right" && currentImage < 3) {
      setCurrentImage((previousState) => previousState + 1);
    }
  }

  useEffect(() => {
    switch (currentImage) {
      case 0:
        setCurrentImageTransitionClass("product__main-image--scrollTo0");
        break;
      case 1:
        setCurrentImageTransitionClass("product__main-image--scrollTo1");
        break;
      case 2:
        setCurrentImageTransitionClass("product__main-image--scrollTo2");
        break;
      case 3:
        setCurrentImageTransitionClass("product__main-image--scrollTo3");
        break;
    }
  }, [currentImage]);

  return (
    <main>
      <div className="product">
        <div className="product__images">
          <div className={`product__main-image ${currentImageTransitionClass}`}>
            <button onClick={handleImageScroll} value="left">
              <MdOutlineKeyboardArrowLeft />
            </button>
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image3} alt="" />
            <img src={image4} alt="" />
            <button onClick={handleImageScroll} value="right">
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
          {isDesktopWidth && (
            <div className="product__images__thumbnail-container">
              <div className="product__thumbnail-image"></div>
              <div className="product__thumbnail-image"></div>
              <div className="product__thumbnail-image"></div>
              <div className="product__thumbnail-image"></div>
            </div>
          )}
        </div>

        <div className="product__text-content">
          <h3 className="product__text-content__brand">Sneaker Company</h3>
          <h2 className="product__text-content__title">
            Fall Limited Edition Sneakers
          </h2>
          <p className="product__text-content__description">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
          <p className="product__text-content__pricebar">
            <span className="product__pricebar__price">$125.00</span>
            <span className="product__pricebar__discount">50%</span>
            <span className="product__pricebar__old-price">$250.00</span>
          </p>

          <div className="product__amount-selection-bar">
            <button id="btn__reduce-amount">
              <FaMinus />
            </button>
            <p>0</p>
            <button id="btn__raise-amount">
              {" "}
              <FaPlus />
            </button>
          </div>
          <button id="btn__add-to-cart" className="button__cta">
            <BsCart3 /> Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default Product;
