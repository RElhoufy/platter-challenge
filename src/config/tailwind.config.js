tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
      },
      colors: {
        'neutral-black': '#231F20',
        'custom-black': '#1C1D1D',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.product-card-skeleton': {
          'border-radius': '8px',
          height: '274px',
          '@apply animate-pulse md:w-[355px] md:h-[467px]': {},
        },
        '.product-card__image-skeleton': {
          height: '159px',
          'background-color': 'rgb(229 231 235)',
          'border-radius': '6px',
          'margin-bottom': '16px',
          '@apply md:w-[355px] md:h-[355px]': {},
        },
        '.product-card__title-skeleton': {
          height: '38px',
          'background-color': 'rgb(229 231 235)',
          'border-radius': '4px',
          width: '75%',
          'margin-bottom': '8px',
          'margin-left': '16px',
        },
        '.product-card__reviews-skeleton': {
          height: '17px',
          'background-color': 'rgb(229 231 235)',
          'border-radius': '4px',
          width: '60%',
          'margin-bottom': '8px',
          'margin-left': '16px',
        },
        '.product-card__price-skeleton': {
          height: '24px',
          'background-color': 'rgb(229 231 235)',
          'border-radius': '4px',
          width: '40%',
          'margin-left': '16px',
        },
      });
    },
  ],
};
