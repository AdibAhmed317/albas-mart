// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     screens: {
//       sm: '640px',
//       // => @media (min-width: 640px) { ... }

//       md: '768px',
//       // => @media (min-width: 768px) { ... }

//       lg: '1024px',
//       // => @media (min-width: 1024px) { ... }

//       xl: '1280px',
//       // => @media (min-width: 1280px) { ... }

//       '2xl': '1536px',
//       // => @media (min-width: 1536px) { ... }
//     },
//     theme: {
//       colors: {
//         primaryBlue: '#000000',
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#d32e75',
        primaryGreen: '#11a76a',
        primaryBlue: '#e3f7fe',
        // Add any other custom colors here
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    // other theme properties
  },
  plugins: [],
};
