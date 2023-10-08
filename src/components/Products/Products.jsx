import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { AddToCart } = useContext(cartContext);

  let {
    addToCart,
    setCartCount,
    addFavorite,
    displayFavorite,
    setCountFav,
    countFav,
    deleteFav,
    setFavorite,
  } = useContext(cartContext);

  const [showHeart, setShowHeart] = useState([]); // State to track heart/broken heart icon

  useEffect(() => {
    // Initialize the array with 'true' values for all products initially
    if (data?.data.data) {
      setShowHeart(new Array(data.data.data.length).fill(true));
    }
  }, []);

  useEffect(() => {
    // Retrieve favorites from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setShowHeart(savedFavorites);
  }, []);

  async function gett(id, index) {
    let response = await addFavorite(id);
    console.log(response);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      getLogedFavorite();
      // Toggle the state for the clicked product
      const updatedShowHeart = [...showHeart];
      updatedShowHeart[index] = !updatedShowHeart[index];
      setShowHeart(updatedShowHeart);

      // Save the updated favorites state to local storage
      localStorage.setItem("favorites", JSON.stringify(updatedShowHeart));
    }
  }

  async function getLogedFavorite() {
    let { data } = await displayFavorite();
    if (data?.status === "success") {
      console.log(data.status);
      setCountFav(data.count);
      console.log(countFav);
    }
  }

  async function getRemoveFav(id, index) {
    let response = await deleteFav(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      console.log(response);
      getLogedFavorite();

      // Toggle the state for the clicked product
      const updatedShowHeart = [...showHeart];
      updatedShowHeart[index] = !updatedShowHeart[index];
      setShowHeart(updatedShowHeart);

      // Save the updated favorites state to local storage
      localStorage.setItem("favorites", JSON.stringify(updatedShowHeart));
    }
  }

  async function addTocart(id) {
    let { data } = await AddToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
    } else {
      toast.error("product not added");
    }
  }

  /*   const [products, setProducts] = useState([]);
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []); */

  async function getProduct() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading, isError, isFetching, refetch } = useQuery(
    "products",
    getProduct,
    {
      //  refetchOnMount:false,
      // staleTime:3000
      // refetchInterval:3000
      // cacheTime:3000
      enabled: true,
    }
  );
  console.log(data?.data.data);
  return (
    <>
      {isLoading ? (
        <div className="vh-100  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="container py-5">
            <div className="row my-5">
              {data?.data.data.map((product, index) => (
                <div key={product.id} className="col-md-2">
                  <div className="product p-2 position-relative">
                    {showHeart[index] ? (
                      <button
                        onClick={() => getRemoveFav(product.id, index)}
                        className="favorite bg-danger text-white position-absolute start-0 btn"
                      >
                        <i className="fas fa-heart-broken"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => gett(product.id, index)}
                        className="favorite bg-main text-white position-absolute end-0 btn"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    )}
                    <Link to={`/details/${product.id}`}>
                      <img className="w-100" src={product.imageCover} alt="" />
                      <span className="font-sm text-main">
                        {product.category.name}
                      </span>
                      <h3 className="h6">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span>{product.price}EGP</span>
                        <span>
                          <i className="fas fa-star rating-color">
                            {product.ratingsAverage}
                          </i>
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addTocart(product.id)}
                      className="btn w-100 bg-main text-white my-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
