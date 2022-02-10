import React, { useState, useEffect } from "react";
import "./Product.css";
import Backdrop from "../utilities/Backdrop";
import Viewer from "../utilities/Viewer";

import { BsCart3 } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function Product(props) {
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
      setIsViewerOpen(false);
    }
  }

  function handleChangeThumbnail(event) {
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
    if (event.target.closest("button").value === "minus" && itemAmount > 1) {
      setItemAmount((previousState) => previousState - 1);
    }
    if (event.target.closest("button").value === "plus" && itemAmount <= 99) {
      setItemAmount((previousState) => previousState + 1);
    }
  }

  function handleToggleViewer() {
    if (isDesktopWidth) {
      setIsViewerOpen((previousState) => !previousState);
    }
    if (isViewerOpen) {
      setIsViewerOpen(false);
    }
  }

  function handlerAddToCart(){
    props.handlerAddToCart(itemAmount);
    setItemAmount(1);
  }

  return (
    <main>
      <div className="product">
        <div className="product__images">
          <div
            className={`product__main-image ${currentImageTransitionClass}`}
            onClick={handleToggleViewer}
          >
            {!isDesktopWidth && (
              <button onClick={handleImageScroll} value="left">
                <MdOutlineKeyboardArrowLeft />
              </button>
            )}
            <img src={props.images[0]} alt="product" />
            <img src={props.images[1]} alt="product" />
            <img src={props.images[2]} alt="product" />
            <img src={props.images[3]} alt="product" />

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
                <img src={props.thumbnails[0]} alt="thumbnail" />
              </button>
              <button
                className={`${currentThumb == "1" ? "thumb--active" : ""}`}
                value="thumb2"
                onClick={handleChangeThumbnail}
              >
                <img src={props.thumbnails[1]} alt="thumbnail" />
              </button>
              <button
                className={`${currentThumb == "2" ? "thumb--active" : ""}`}
                value="thumb3"
                onClick={handleChangeThumbnail}
              >
                <img src={props.thumbnails[2]} alt="thumbnail" />
              </button>
              <button
                className={`${currentThumb == "3" ? "thumb--active" : ""}`}
                value="thumb4"
                onClick={handleChangeThumbnail}
              >
                <img src={props.thumbnails[3]} alt="thumbnail" />
              </button>
            </div>
          )}
        </div>

        <div className="product__text-content">
          <h3 className="product__text-content__brand">{props.brand}</h3>
          <h2 className="product__text-content__title">{props.title}</h2>
          <p className="product__text-content__description">
            {props.description}
          </p>
          <p className="product__text-content__pricebar">
            <span className="product__pricebar__price">${props.price}</span>
            <span className="product__pricebar__discount">
              {props.discount}
            </span>
            <span className="product__pricebar__old-price">
              ${props.oldprice}
            </span>
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
          <button id="btn__add-to-cart" className="button__cta" onClick={handlerAddToCart}>
            <BsCart3 /> Add to cart
          </button>
        </div>
      </div>

      {isViewerOpen && <Backdrop />}
      {isViewerOpen && (
        <Viewer
          images={props.images}
          thumbnails={props.thumbnails}
          handleCloseViewer={handleToggleViewer}
        />
      )}
    </main>
  );
}

export default Product;
