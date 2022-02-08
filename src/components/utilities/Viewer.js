import React, { useEffect, useState } from "react";
import "./Viewer.css";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { MdClose } from "react-icons/md";

import image1 from "../../images/image-product-1.jpg";
import image2 from "../../images/image-product-2.jpg";
import image3 from "../../images/image-product-3.jpg";
import image4 from "../../images/image-product-4.jpg";

import thumb1 from "../../images/image-product-1-thumbnail.jpg";
import thumb2 from "../../images/image-product-2-thumbnail.jpg";
import thumb3 from "../../images/image-product-3-thumbnail.jpg";
import thumb4 from "../../images/image-product-4-thumbnail.jpg";

function Viewer() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentImageTransitionClass, setCurrentImageTransitionClass] =
    useState("viewer__main-image--scrollTo0");
  const [currentThumb, setCurrentThumb] = useState(0);

  useEffect(() => {
    switch (currentImage) {
      case 0:
        setCurrentImageTransitionClass("viewer__main-image--scrollTo0");
        setCurrentThumb(0);
        break;
      case 1:
        setCurrentImageTransitionClass("viewer__main-image--scrollTo1");
        setCurrentThumb(1);
        break;
      case 2:
        setCurrentImageTransitionClass("viewer__main-image--scrollTo2");
        setCurrentThumb(2);

        break;
      case 3:
        setCurrentImageTransitionClass("viewer__main-image--scrollTo3");
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

  return (
    <div className="viewer__images">
        <button id="btn__close-viewer"><MdClose /></button>
      <div className={`viewer__main-image ${currentImageTransitionClass}`}>
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

      <div className="viewer__images__thumbnail-container">
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
    </div>
  );
}

export default Viewer;
