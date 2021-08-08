const shadowEffects = {
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
    bgGradient: "radial(brand.800 -15%, rgba(0, 0, 0, 0) 72%)",
  },
  _hover: {
    bg: "brand.800",
    color: "white",
    transform: "translateY(-3px)",
    _before: {
      opacity: 1,
      transform: "translateY(3px)",
    },
  },
  transition: "all 300ms",
};

const Button = {
  baseStyle: {
    border: "1px",
    fontWeight: 400,
    textTransform: "uppercase",
    borderRadius: "full",
  },
  sizes: {
    md: {
      height: "unset",
      py: "4",
      minW: "260px",
      minWidth: "260px",
    },
    sm: {
      height: "unset",
      py: "3",
      minW: "200px",
      minWidth: "200px",
    },
  },
  variants: {
    solid: {
      ...shadowEffects,
      color: "white",
      bg: "brand.800",
      border: "none",
    },
    outlined: {
      ...shadowEffects,
      color: "brand.800",
      bg: "white",
      borderColor: "brand.800",
    },
  },
};

export default Button;
