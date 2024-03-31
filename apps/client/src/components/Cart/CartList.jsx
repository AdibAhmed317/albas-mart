import React from "react";
import { removeProduct, updateProductQuantity } from "../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const CartList = () => {
  const product = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const increaseQuantity = (product) => {
    dispatch(
      updateProductQuantity({ ...product, quantity: product.quantity + 1 })
    );
  };

  const decreaseQuantity = (product) => {
    if (product.quantity > 0) {
      dispatch(
        updateProductQuantity({ ...product, quantity: product.quantity - 1 })
      );
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <>
      {product.map((product, index) => (
        <div key={index}>
          <hr />
          <div key={product._id} className="flex flex-col md:flex-row m-5">
            <img
              src={product.img}
              className="h-[150px] w-[150px] object-cover"
            />
            <div className="ml-0 md:ml-5">
              <h1 className="text-3xl font-serif m-2">{product.title}</h1>
              <p className="text-lg m-2">Price: ৳{product.price}</p>
              <div>
                <button
                  className="h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white"
                  onClick={() => increaseQuantity(product)}
                >
                  +
                </button>
                <span className="m-2">{product.quantity}</span>
                <button
                  className="h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white"
                  onClick={() => decreaseQuantity(product)}
                >
                  -
                </button>
                <button
                  className="ml-2 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all p-1 px-2 rounded-lg text-white"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default CartList;
