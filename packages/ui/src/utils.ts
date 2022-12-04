interface StaticImage {
  src: string;
}

export const imageSrc = (image: string | StaticImage) =>
  typeof image === "string" ? image : image.src;
