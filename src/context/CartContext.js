import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User is not authenticated");
          return;
        }
  
        const res = await fetch("https://cart-app-3v54.onrender.com/verse/cart/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch cart");
        }
  
        const data = await res.json();
        setCart(data.cartItems || []); 
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, []);
  
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }
  
      const res = await fetch("https://cart-app-3v54.onrender.com/verse/cart/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }), 
        credentials: "include",
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
  
      const data = await res.json();
      setCart(data.cartItems || []);  
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }
  
      const res = await fetch("https://cart-app-3v54.onrender.com/verse/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to remove item from cart");
      }
  
      setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
