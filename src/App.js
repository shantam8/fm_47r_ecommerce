import { useState, useEffect } from "react";
import data from "./data.json";
import Header from "./components/Header/Header";
import Product from "./pages/Product";

function App() {
  const [selectedProduct, setSelectedProduct] = useState("0");
  const [cartContent, setcartContent] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [isCartWiggleActive, setIsCartWiggleActive] = useState(false);

  useEffect(() => {
    setTotalItemsInCart(cartContent.length / 2);
  }, [cartContent]);

  function handleProductSelection(value) {
    setSelectedProduct(value);
  }

  function handlerAddToCart(value) {
    if (!isCartWiggleActive) {
      setTimeout(() => {
        setIsCartWiggleActive(false);
      }, 1200);
      setIsCartWiggleActive(true);
    }
    setcartContent((previousState) => {
      let tmp = [...previousState];
      let productExisting = false;
      tmp.map((element, index) => {
        if (index % 2 === 0 && element === selectedProduct) {
          tmp[index + 1] = value;
          productExisting = true;
        }
      });
      if (productExisting) {
        return [...tmp];
      } else {
        return [...tmp, selectedProduct, value];
      }
    });
  }

  function handleRemoveItemFromCart(value) {
    setcartContent((previousState) => {
      let tmp = [...previousState];
      tmp.map((element, index) => {
        if (index % 2 === 0 && element === value) {
          tmp.splice(index, 2);
          return;
        }
      });
      return [...tmp];
    });
  }

  return (
    <>
      <Header
        title={data.products}
        product={handleProductSelection}
        cartContent={cartContent}
        totalItemsInCart={totalItemsInCart}
        data={data}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        wiggleCart={isCartWiggleActive}
      />
      <Product
        brand={data.products[selectedProduct].brand}
        title={data.products[selectedProduct].title}
        description={data.products[selectedProduct].description}
        price={data.products[selectedProduct].price}
        discount={data.products[selectedProduct].discount}
        oldprice={data.products[selectedProduct].oldprice}
        images={data.products[selectedProduct].images}
        thumbnails={data.products[selectedProduct].thumbnails}
        handlerAddToCart={handlerAddToCart}
      />
    </>
  );
}

export default App;
