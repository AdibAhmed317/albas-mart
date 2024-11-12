import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';

const AdminPos = () => {
  const [cart, setCart] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0); // Default discount set to 0

  // Sample products (You can replace this with API calls to a database)
  const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 },
    { id: 3, name: 'Product C', price: 200 },
    { id: 4, name: 'Product D', price: 50 },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add item to cart
  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    updateTotal(newCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    updateTotal(newCart);
  };

  // Update total price with discount
  const updateTotal = (cart) => {
    // Calculate the total price of items in the cart
    const calculatedTotal = cart.reduce((acc, item) => acc + item.price, 0);

    // Apply the discount if it exists (discount > 0)
    const finalTotal =
      discount > 0 ? calculatedTotal - discount : calculatedTotal;

    // Ensure the total is never negative
    setTotal(finalTotal >= 0 ? finalTotal : 0);
  };

  // Handle payment (simulated)
  const handlePayment = () => {
    // Calculate the total price of items in the cart
    const calculatedTotal = cart.reduce((acc, item) => acc + item.price, 0);

    // Apply the discount (if any)
    const discountedTotal =
      discount > 0 ? calculatedTotal - discount : calculatedTotal;

    // Ensure that the final total is not negative
    const finalTotal = discountedTotal >= 0 ? discountedTotal : 0;

    // Calculate the change based on the payment amount
    const change = paymentAmount >= finalTotal ? paymentAmount - finalTotal : 0;

    if (paymentAmount >= finalTotal) {
      // Record sales history with the discount included
      setSalesHistory([
        ...salesHistory,
        {
          cart,
          total: finalTotal, // Use the final total after discount
          discount: discount, // Store discount in the sales history
          paymentAmount,
          change,
        },
      ]);
      // Reset the cart, total, and other values
      setCart([]);
      setTotal(0);
      setPaymentAmount(0);
      setDiscount(0); // Reset discount after payment
      alert('Payment Successful');
    } else {
      alert('Insufficient payment amount');
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-primaryBlue text-white'>
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Admin POS System
        </h1>

        {/* Search Bar */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search Products...'
            className='w-full p-3 border-2 border-gray-300 rounded-lg'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Product List */}
        {searchQuery && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out'
                >
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600 mt-2'>
                    Price: {product.price} BDT
                  </p>
                  <button
                    className='mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200'
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className='col-span-3 text-center text-gray-500'>
                No products found
              </p>
            )}
          </div>
        )}

        {/* Cart */}
        <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Shopping Cart
          </h2>
          {cart.length > 0 ? (
            <div>
              <ul className='space-y-4'>
                {cart.map((item, index) => (
                  <li key={index} className='flex justify-between items-center'>
                    <span>{item.name}</span>
                    <span>{item.price} BDT</span>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className='mt-4 text-xl font-semibold'>
                <strong>Total: {total} BDT</strong>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Discount Section */}
        <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>Discount</h2>
          <input
            type='number'
            placeholder='Enter discount (taka)'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            value={discount === 0 ? '' : discount} // Ensure empty field when discount is 0
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setDiscount(isNaN(value) ? 0 : value); // Handle NaN and allow empty field
            }}
          />
        </div>

        {/* Payment Section */}
        <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>Payment</h2>
          <input
            type='number'
            placeholder='Enter payment amount'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
          />
          <button
            className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'
            onClick={handlePayment}
          >
            Process Payment
          </button>
        </div>

        {/* Sales History */}
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Sales History
          </h2>
          <ul className='space-y-4'>
            {salesHistory.map((sale, index) => (
              <li key={index} className='border-b pb-4'>
                <div>
                  <strong>Transaction {index + 1}</strong>
                </div>
                <div>Total: {sale.total} BDT</div>
                <div>Discount: {sale.discount} BDT</div> {/* Show discount */}
                <div>Payment: {sale.paymentAmount} BDT</div>
                <div>Change: {sale.change} BDT</div>
                <ul>
                  {sale.cart.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPos;
