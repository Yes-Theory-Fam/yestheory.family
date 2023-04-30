module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "button-shadow": "radial-gradient(#0167ff -15%, rgba(0, 0, 0, 0) 72%)",
      },
      boxShadow: {
        "image-left": "-15px 15px 60px #0067ff40",
        "image-right": "15px 15px 60px #0067ff40",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      height: {
        header: "600px",
      },
      lineHeight: {
        0: "0",
      },
      animation: {
        "fade-in": "fade-in 100ms linear",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "#00000000",
      brand: {
        50: "#e2f4ff",
        100: "#bae2ff",
        200: "#88d1ff",
        300: "#47beff",
        400: "#00aeff",
        500: "#009eff",
        600: "#008eff",
        700: "#007aff",
        800: "#0167ff",
        900: "#2341e0",
      },
      gray: {
        50: "#f7f7f7",
        100: "#eeeeee",
        200: "#dcdcdc",
        300: "#b8b8b8",
        400: "#999999",
        500: "#707070",
        600: "#474747",
        700: "#3d3d3d",
        800: "#2a2a2a",
        900: "#0f0f0f",
      },
    },
  },
};
