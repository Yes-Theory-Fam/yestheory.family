export interface Positioned {
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
}

export const fullWidth: Positioned = {
  left: 0,
  right: 0,
};

export const getImageDimensions = (
  src: string,
  timeout = 3000
): Promise<{ height: number; width: number }> =>
  new Promise((res, rej) => {
    const img = new window.Image();
    img.addEventListener("load", function () {
      const height = this.naturalHeight;
      const width = this.naturalWidth;

      res({ height, width });
    });

    img.src = src;

    setTimeout(
      () =>
        rej(
          `Error loading image ${src}. Timeout reached after ${
            timeout / 1000
          } seconds`
        ),
      timeout
    );
  });
