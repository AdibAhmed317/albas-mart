import React from 'react';

export const ArrowLeft = () => {
  return (
    <>
      <svg
        width='50px'
        height='50px'
        viewBox='0 0 64 64'
        xmlns='http://www.w3.org/2000/svg'
        stroke-width='0.64'
        stroke='#000000'
        fill='none'
        transform='matrix(-1, 0, 0, 1, 0, 0)'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_iconCarrier'>
          <polyline points='18.86 57.47 44.12 30.84 18.86 6.58'></polyline>
        </g>
      </svg>
    </>
  );
};

export const ArrowRight = () => {
  return (
    <>
      <svg
        width='50px'
        height='50px'
        viewBox='0 0 64 64'
        xmlns='http://www.w3.org/2000/svg'
        stroke-width='0.64'
        stroke='#000000'
        fill='none'
        transform='matrix(1, 0, 0, 1, 0, 0)'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_iconCarrier'>
          <polyline points='18.86 57.47 44.12 30.84 18.86 6.58'></polyline>
        </g>
      </svg>
    </>
  );
};

export const ShoppingCart = () => {
  return (
    <>
      <svg
        className='h-5 w-5 hover:text-green-600'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};

export const Search = () => {
  return (
    <>
      <svg
        width='30px'
        height='30px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          stroke-linecap='round'
          stroke-linejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            d='M14.5776 14.5419C15.5805 13.53 16.2 12.1373 16.2 10.6C16.2 7.50721 13.6928 5 10.6 5C7.50721 5 5 7.50721 5 10.6C5 13.6928 7.50721 16.2 10.6 16.2C12.1555 16.2 13.5628 15.5658 14.5776 14.5419ZM14.5776 14.5419L19 19'
            stroke='#464455'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>{' '}
        </g>
      </svg>
    </>
  );
};
