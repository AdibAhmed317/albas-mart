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

export const Remove = () => {
  return (
    <>
      <svg
        width='30px'
        height='30px'
        viewBox='-204.8 -204.8 1433.60 1433.60'
        class='icon'
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        stroke='#000000'
        stroke-width='0.01024'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke='#CCCCCC'
          stroke-width='24.576'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          <path
            fill='#000000'
            d='M352 480h320a32 32 0 110 64H352a32 32 0 010-64z'
          ></path>
          <path
            fill='#000000'
            d='M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z'
          ></path>
        </g>
      </svg>
    </>
  );
};

export const Add = () => {
  return (
    <>
      <svg
        width='30px'
        height='30px'
        viewBox='-7.2 -7.2 38.40 38.40'
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
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='#000000'
            stroke-width='2'
          ></circle>{' '}
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M13.0001 7C13.0001 6.44771 12.5524 6 12.0001 6C11.4479 6 11.0001 6.44771 11.0001 7V11H7C6.44771 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11.0001V17C11.0001 17.5523 11.4479 18 12.0001 18C12.5524 18 13.0001 17.5523 13.0001 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13.0001V7Z'
            fill='#000000'
          ></path>{' '}
        </g>
      </svg>
    </>
  );
};

export const ShoppingCartSingle = () => {
  return (
    <>
      <svg
        className='h-7 w-10 hover:text-green-600'
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
