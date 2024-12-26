import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';
import { Search, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { publicRequest } from '@/network/request-method';

const AdminPos = () => {
  const [cart, setCart] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await publicRequest.get('products/all?categories=all');
      console.log('Fetched products:', response.data); // Add this to debug
      setFetchedProduct(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const subtotal = calculateSubtotal(cart);
    const discountValue = parseFloat(discount) || 0;
    const validDiscount = Math.min(Math.max(discountValue, 0), subtotal);
    const finalTotal = subtotal - validDiscount;
    setTotal(finalTotal);
  }, [cart, discount]);

  const filteredProducts = fetchedProduct.filter(
    (product) =>
      product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id); // Change id to _id
    if (existingItem) {
      const newCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
    }
  };

  const updateQuantity = (productId, change) => {
    const newCart = cart
      .map((item) => {
        if (item._id === productId) {
          // Change id to _id
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);
    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item._id !== productId); // Change id to _id
    setCart(newCart);
  };

  // Update handlePayment function
  const handlePayment = () => {
    const subtotal = calculateSubtotal(cart);
    const discountValue = parseFloat(discount) || 0;
    const validDiscount = Math.min(Math.max(discountValue, 0), subtotal);
    const finalTotal = subtotal - validDiscount;
    const paymentValue = parseFloat(paymentAmount) || 0;
    const change = Math.max(paymentValue - finalTotal, 0);

    if (paymentValue >= finalTotal) {
      setSalesHistory([
        ...salesHistory,
        {
          items: cart.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
          subtotal,
          discount: validDiscount,
          total: finalTotal,
          paymentAmount: paymentValue,
          change,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setCart([]);
      setTotal(0);
      setPaymentAmount('');
      setDiscount('');
      alert('Payment Successful');
    } else {
      alert('Insufficient payment amount');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminSidebar />

      <div className='pt-16 sm:pt-0 sm:pl-64'>
        {/* Mobile view tabs */}
        <div className='sm:hidden flex border-b'>
          <button
            className={`flex-1 py-2 px-4 ${
              showCart ? '' : 'bg-blue-50 border-b-2 border-blue-500'
            }`}
            onClick={() => setShowCart(false)}
          >
            Products
          </button>
          <button
            className={`flex-1 py-2 px-4 ${
              showCart ? 'bg-blue-50 border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setShowCart(true)}
          >
            Cart ({cart.length})
          </button>
        </div>

        <div className='flex flex-col sm:flex-row h-[calc(100vh-4rem)] sm:h-screen p-4 gap-4'>
          {/* Products Section */}
          <div
            className={`${
              showCart ? 'hidden' : 'flex'
            } sm:flex sm:w-2/3 flex-col gap-4`}
          >
            {/* Search Bar */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search Products...'
                className='w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto flex-1'>
              {isLoading ? (
                <div className='col-span-full text-center py-12'>
                  Loading products...
                </div>
              ) : error ? (
                <div className='col-span-full text-center py-12 text-red-500'>
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className='col-span-full text-center py-12'>
                  No products found
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className='bg-white max-h-[20rem] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                    onClick={() => addToCart(product)}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className='w-full aspect-square object-cover rounded-md mb-2'
                    />
                    <h3 className='font-medium text-gray-800 truncate'>
                      {product.title}
                    </h3>
                    <p className='text-sm text-gray-600 mb-1'>{product.size}</p>
                    <p className='text-blue-600 font-semibold'>
                      ৳ {product.price}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Section */}
          <div
            className={`${
              showCart ? 'flex' : 'hidden'
            } sm:flex sm:w-1/3 flex-col gap-4`}
          >
            <div className='bg-white rounded-lg shadow-sm p-4 flex flex-col flex-1'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold flex items-center gap-2'>
                  <ShoppingCart size={24} /> Cart
                </h2>
                <span className='text-sm text-gray-500'>
                  {cart.length} items
                </span>
              </div>

              {/* Cart Items */}
              <div className='flex-1 overflow-y-auto'>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className='flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg mb-2'
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className='w-12 h-12 rounded-md object-cover'
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium truncate'>{item.title}</h3>
                      <p className='text-sm text-gray-600'>{item.size}</p>
                      <p className='text-sm font-medium'>৳ {item.price}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item._id, -1);
                        }}
                        className='p-1 hover:bg-gray-200 rounded'
                      >
                        <Minus size={16} />
                      </button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item._id, 1);
                        }}
                        className='p-1 hover:bg-gray-200 rounded'
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item._id);
                        }}
                        className='p-1 text-red-500 hover:bg-red-50 rounded'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              <div className='border-t pt-4 mt-auto'>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span>Subtotal:</span>
                    <span>{calculateSubtotal(cart)} BDT</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span>Discount:</span>
                    <div className='relative w-24'>
                      <input
                        type='text'
                        className='w-full text-right border rounded px-2 py-1'
                        value={discount}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            setDiscount(value);
                          }
                        }}
                        placeholder='0'
                      />
                      {parseFloat(discount) > calculateSubtotal(cart) && (
                        <p className='absolute right-0 text-xs text-red-500 whitespace-nowrap'>
                          Cannot exceed subtotal
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-between items-center text-lg font-bold'>
                    <span>Total:</span>
                    <span>{total} BDT</span>
                  </div>
                  <div className='space-y-2'>
                    <input
                      type='text'
                      placeholder='Enter payment amount'
                      className='w-full p-2 border rounded'
                      value={paymentAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setPaymentAmount(value);
                        }
                      }}
                    />
                    {parseFloat(paymentAmount) > 0 && (
                      <div className='text-sm text-gray-600 text-right'>
                        Change:{' '}
                        {Math.max((parseFloat(paymentAmount) || 0) - total, 0)}{' '}
                        BDT
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handlePayment}
                    className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300'
                    disabled={
                      cart.length === 0 || parseFloat(paymentAmount) < total
                    }
                  >
                    Complete Payment
                  </button>

                  {/* Sales History Toggle */}
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className='w-full text-blue-600 hover:text-blue-700 font-medium text-center py-2'
                  >
                    {showHistory ? 'Hide Sales History' : 'Show Sales History'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales History Modal */}
        {showHistory && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Sales History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  ✕
                </button>
              </div>
              <div className='space-y-6'>
                {salesHistory.map((sale, index) => (
                  <div key={index} className='border-b pb-4'>
                    <div className='text-sm text-gray-500 mb-2'>
                      {sale.timestamp}
                    </div>
                    {/* Items List */}
                    <div className='bg-gray-50 rounded-lg p-3 mb-3'>
                      <h3 className='font-medium mb-2'>Items:</h3>
                      <div className='space-y-2'>
                        {sale.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className='flex justify-between text-sm'
                          >
                            <div className='flex items-center gap-2'>
                              <span className='font-medium'>{item.title}</span>
                              <span className='text-gray-500'>
                                (x{item.quantity})
                              </span>
                            </div>
                            <span>৳ {item.total}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Summary */}
                    <div className='space-y-1 text-sm'>
                      <div className='flex justify-between'>
                        <span>Subtotal:</span>
                        <span>৳ {sale.subtotal}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Discount:</span>
                        <span>৳ {sale.discount}</span>
                      </div>
                      <div className='flex justify-between font-medium'>
                        <span>Total:</span>
                        <span>৳ {sale.total}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Payment:</span>
                        <span>৳ {sale.paymentAmount}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Change:</span>
                        <span>৳ {sale.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPos;
