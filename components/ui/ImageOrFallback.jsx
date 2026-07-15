import Image from "next/image";

/**
 * Renders a real image if `src` is set, otherwise renders `fallback`
 * (typically the site's existing gradient/SVG placeholder).
 *
 * This is the whole point of the image-editing setup: components never
 * need editing to add a photo — just set the path in lib/site-images.js
 * and this automatically switches from placeholder to real image.
 *
 * `fill` mode (fills the nearest `position: relative` parent) is used by
 * default since most placeholders are absolutely/relatively positioned
 * shapes. Pass width/height instead for a fixed-size image.
 */
export default function ImageOrFallback({
  src,
  alt = "",
  fallback = null,
  className = "",
  width,
  height,
  fill = !width && !height,
  sizes,
  priority = false,
}) {
  if (!src) return fallback;

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
    />
  );
}
