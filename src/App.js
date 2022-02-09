import Product from "./pages/Product";
import Header from "./components/Header/Header";
import data from "./data.json";
import { useState } from "react";

function App() {
  const [selectedProduct, setSelectedProduct] = useState("0");

  const [cartContent, setcartContent] = useState([]);

  function handleProductSelection(value) {
    setSelectedProduct(value);
  }

  function handlerAddToCart(value) {
    setcartContent((previousState) => {
      let tmp = [...previousState];
      let productExisting = false;
      tmp.map((element, index) => {
        if (index % 2 == 0 && element == selectedProduct) {
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
    console.log("remove: " + value);
    setcartContent((previousState) => {
      let tmp = [...previousState];
      tmp.map((element, index) => {
        if (index % 2 == 0 && element == value) {
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
        data={data}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
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
