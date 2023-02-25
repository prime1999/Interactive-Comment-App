/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      body: ["Rubik"],
    },

    extend: {
      colors: {
        darkBlue: "hsl(212, 24%, 26%)",
        grayishBlue: "hsl(211, 10%, 45%)",
        lightGray: "hsl(223, 19%, 93%)",
        veryLightGray: "hsl(228, 33%, 97%)",
        white: "hsl(0, 0%, 100%)",
        moderateBlue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGrayishBlue: "hsl(239, 57%, 85%)",
        paleRed: "hsl(357, 100%, 86%)",
        transBlack: "cmyk(0%, 0%, 0%, 35%)",
      },
    },
  },
};
