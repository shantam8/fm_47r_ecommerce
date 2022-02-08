import React, { useState, useEffect } from "react";
import "./Product.css";
import Backdrop from "../components/utilities/Backdrop";
import Viewer from "../components/utilities/Viewer";

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

import thumb1 from "../images/image-product-1-thumbnail.jpg";
import thumb2 from "../images/image-product-2-thumbnail.jpg";
import thumb3 from "../images/image-product-3-thumbnail.jpg";
import thumb4 from "../images/image-product-4-thumbnail.jpg";

function Product() {
  const [isDesktopWidth, setIsDesktopWidth] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentImageTransitionClass, setCurrentImageTransitionClass] =
    useState("product__main-image--scrollTo0");
  const [currentThumb, setCurrentThumb] = useState(0);

  const [itemAmount, setItemAmount] = useState(1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    switch (currentImage) {
      case 0:
        setCurrentImageTransitionClass("product__main-image--scrollTo0");
        setCurrentThumb(0);
        break;
      case 1:
        setCurrentImageTransitionClass("product__main-image--scrollTo1");
        setCurrentThumb(1);

        break;
      case 2:
        setCurrentImageTransitionClass("product__main-image--scrollTo2");
        setCurrentThumb(2);

        break;
      case 3:
        setCurrentImageTransitionClass("product__main-image--scrollTo3");
        setCurrentThumb(3);

        break;
    }
  }, [currentImage]);

  function handleImageScroll(event) {
    let value = event.target.closest("button").value;
    if (value === "left" && currentImage > 0) {
      setCurrentImage((previousState) => previousState - 1);
    }
    if (value === "right" && currentImage < 3) {
      setCurrentImage((previousState) => previousState + 1);
    }
  }

  function handleWindowResize() {
    if (window.innerWidth >= 640) {
      setIsDesktopWidth(true);
    } else {
      setIsDesktopWidth(false);
    }
  }

  function handleChangeThumbnail(event) {
    console.log(event.target.closest("button"));
    switch (event.target.closest("button").value) {
      case "thumb1":
        setCurrentImage(0);

        break;
      case "thumb2":
        setCurrentImage(1);
        break;
      case "thumb3":
        setCurrentImage(2);
        break;
      case "thumb4":
        setCurrentImage(3);
        break;
    }
  }

  function handleChangeItemAmount(event) {
    if (event.target.closest("button").value == "minus" && itemAmount > 1) {
      setItemAmount((previousState) => previousState - 1);
    }
    if (event.target.closest("button").value == "plus" && itemAmount <= 99) {
      setItemAmount((previousState) => previousState + 1);
    }
  }

  function handleOpenViewer(event) {
    if (isDesktopWidth) {
      setIsViewerOpen((previousState) => !previousState);
      console.log(event.target);
    }
  }

  return (
    <main>
      <div className="product">
        <div className="product__images">
          <div
            className={`product__main-image ${currentImageTransitionClass}`}
            onClick={handleOpenViewer}
          >
            {!isDesktopWidth && (
              <button onClick={handleImageScroll} value="left">
                <MdOutlineKeyboardArrowLeft />
              </button>
            )}
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image3} alt="" />
            <img src={image4} alt="" />

            {!isDesktopWidth && (
              <button onClick={handleImageScroll} value="right">
                <MdOutlineKeyboardArrowRight />
              </button>
            )}
          </div>
          {isDesktopWidth && (
            <div className="product__images__thumbnail-container">
              <button
                className={`${currentThumb == "0" ? "thumb--active" : ""}`}
                value="thumb1"
                onClick={handleChangeThumbnail}
              >
                <img src={thumb1} alt="" />
              </button>
              <button
                className={`${currentThumb == "1" ? "thumb--active" : ""}`}
                value="thumb2"
                onClick={handleChangeThumbnail}
              >
                <img src={thumb2} alt="" />
              </button>
              <button
                className={`${currentThumb == "2" ? "thumb--active" : ""}`}
                value="thumb3"
                onClick={handleChangeThumbnail}
              >
                <img src={thumb3} alt="" />
              </button>
              <button
                className={`${currentThumb == "3" ? "thumb--active" : ""}`}
                value="thumb4"
                onClick={handleChangeThumbnail}
              >
                <img src={thumb4} alt="" />
              </button>
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
            <button
              id="btn__reduce-amount"
              onClick={handleChangeItemAmount}
              value="minus"
            >
              <FaMinus />
            </button>
            <p>{itemAmount}</p>
            <button
              id="btn__raise-amount"
              onClick={handleChangeItemAmount}
              value="plus"
            >
              {" "}
              <FaPlus />
            </button>
          </div>
          <button id="btn__add-to-cart" className="button__cta">
            <BsCart3 /> Add to cart
          </button>
        </div>
      </div>

      {isViewerOpen && <Backdrop />}
      {isViewerOpen && <Viewer />}
    </main>
  );
}

export default Product;
