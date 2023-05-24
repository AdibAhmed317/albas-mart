import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styled from 'styled-components';
import b1 from '../assets/b1.jpg';
import { Add, Remove } from '../assets/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PayTest from '../components/Checkout/PayTest';

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'solid'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
  border-width: 2px;
`;

const SummaryItem = styled.div`
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '20px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div id='container' className=' bg-green-100'>
      <Navbar />
      <div className='p-5' id='wrapper'>
        <h1 className='font-light text-center text-5xl' id='title'>
          Title
        </h1>
        <div
          className='flex flex-col md:flex-row items-center justify-between p-5'
          id='top'
        >
          <Link to='/product-list'>
            <TopButton>Continue Shopping</TopButton>
          </Link>
          <div id='toptexts'>
            <span className='underline my-0 mx-3 '>Shopping Bag (02)</span>
            <span className='underline my-0 mx-3 '>Your Wishlist (0)</span>
          </div>
          <TopButton type='filled'>Checkout Now</TopButton>
        </div>
        <div className='flex flex-col md:flex-row justify-between' id='bottom'>
          <div className='flex-[3]' id='info'>
            {cart.products.map((product) => (
              <>
                <hr className='bg-green-400 h-0.5 my-4 mr-1 md:mr-5' />
                <div className='flex justify-between' id='product'>
                  <div className='flex-[2] flex' id='productDetail'>
                    <img className='md:w-[150px] w-28' src={b1} />
                    <div
                      className='p-5 flex flex-col justify-center'
                      id='details'
                    >
                      <h1 className='my-3' id='productName'>
                        <b>Product: </b>
                        {product.title}
                      </h1>
                      <span className='my-3' id='productsize'>
                        <b>Size: </b>
                        {product.size}
                      </span>
                    </div>
                  </div>
                  <div
                    className='flex-0 md:flex-1 flex items-center justify-center flex-col'
                    id='priceDetail'
                  >
                    <div
                      className='flex flex-col md:flex-row items-center mb-1'
                      id='productAmountContainer'
                    >
                      <Add />
                      <span className='text-2xl m-1' id='productAmount'>
                        {product.quantity}
                      </span>
                      <Remove />
                    </div>
                    <div
                      className='font-extralight text-2xl mr-1'
                      id='productPrice'
                    >
                      ${product.price * product.quantity}
                    </div>
                  </div>
                </div>
                <hr className='bg-green-400 h-0.5 my-4 mr-1 md:mr-5' />
              </>
            ))}
          </div>
          <div
            className='mt-3 md:mt-0 flex-1 border-[0.5px] border-gray-500 rounded-[10px] py-2 px-5 border-solid h-[55vh]'
            id='summary'
          >
            <h1
              className='font-extralight text-4xl capitalize'
              id='summaryTitle'
            >
              ORDER SUMMARY
            </h1>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- $5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <PayTest cartTotal={cart.total} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
