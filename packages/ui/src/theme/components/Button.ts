const Button = {
  baseStyle: {
    border: "1px",
    textTransform: "uppercase",
    borderRadius: "9999px",
  },
  sizes: {
    md: {
      height: "unset",
      py: "4",
      minWidth: "260px",
    },
    sm: {
      height: "unset",
      py: "3",
      minWidth: "200",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "brand.500",
    },
    outlined: {
      _before: {
        content: '""',
        height: "10px",
        left: "5%",
        opacity: 0,
        pointerEvents: "none",
        position: "absolute",
        top: "100%",
        width: "90%",
        zIndex: -1,
        transition: "transform,opacity 300ms",
        bgGradient: "radial(brand.500 -15%, rgba(0, 0, 0, 0) 72%)",
      },
      _hover: {
        bg: "brand.500",
        color: "white",
        transform: "translateY(-3px)",
        _before: {
          opacity: 1,
          transform: "translateY(3px)",
        },
      },
      transition: "all 300ms",
      color: "brand.500",
      bg: "white",
      borderColor: "brand.500",
    },
  },
};

export default Button;
