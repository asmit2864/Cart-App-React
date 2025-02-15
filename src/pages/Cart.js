import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CartPage.css";
import AuthContext from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  console.log(cart);
  return (
    <div className="container mt-5 cart-container">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Shopping Cart</h2>
  
      {cart.length === 0 ? (
        <p className="text-center text-muted fs-5">🛒 Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark text-white">
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{item.product.name}</td>
                    <td>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="img-thumbnail"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-bold text-primary">${item.product.cost}</td>
                    <td>
                      <span className="badge bg-secondary p-2">{item.quantity}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          removeFromCart(item.product._id);
                          toast.success(`${item.product.name} removed!`);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default CartPage;
