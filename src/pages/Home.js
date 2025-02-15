import React, { useState, useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        setProducts([])
        return;
      }
    fetch("https://cart-app-3v54.onrender.com/verse/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Products</h1>
      {products.length===0?<h2 className="mt-4 text-center"><br></br><br></br><br></br>No products to display. Please Sign in.</h2>:""}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card shadow-lg border-0 rounded">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold text-primary">${product.cost}</p>
                <button className="btn bg-primary text-white w-100" onClick={() => handleAddToCart(product)}>
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Home;
