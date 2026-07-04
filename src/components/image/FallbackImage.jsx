"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DEFAULT_IMAGE_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><rect width="640" height="640" fill="%23f3f4f6"/><path d="M236 360 L284 304 L336 354 L376 316 L452 408 H188 Z" fill="%23d1d5db"/><circle cx="408" cy="240" r="34" fill="%23d1d5db"/></svg>';

export default function FallbackImage({ src, fallbackSrc = DEFAULT_IMAGE_SRC, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [fallbackSrc, src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
