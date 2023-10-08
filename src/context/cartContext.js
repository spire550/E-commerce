import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  let [favorite, setFavorite] = useState(null);
  let [countFav, setCountFav] = useState(null);
  let [cartCount, setCartCount] = useState(0);
  let baseUrl = `https://ecommerce.routemisr.com`;
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function AddToCart(id) {
    return axios.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: headers,
      }
    );
  }

  function getLoggedUserCart() {
    return axios.get(`${baseUrl}/api/v1/cart`, {
      headers: headers,
    });
  }

  function removeItem(id) {
    return axios.delete(`${baseUrl}/api/v1/cart/${id}`, {
      headers: headers,
    });
  }

  function updateCountItem(id, count) {
    return axios.put(
      `${baseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: headers,
      }
    );
  }

  function onlinePayment(id, shippingAddress) {
    return axios.post(
      `${baseUrl}/api/v1/orders/checkout-session/${id}`,
      {
        shippingAddress: shippingAddress,
      },
      {
        headers: headers,
      }
    );
  }

  function addFavorite(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function displayFavorite() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteFav(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        onlinePayment,
        AddToCart,
        getLoggedUserCart,
        removeItem,
        updateCountItem,
        addFavorite,
        displayFavorite,
        deleteFav,
        favorite,
        setFavorite,
        countFav,
        setCountFav,
        clearUserCart,
        cartCount,
        setCartCount,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
