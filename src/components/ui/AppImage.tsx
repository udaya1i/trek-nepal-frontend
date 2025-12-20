import React, { useState } from 'react';

/* =======================
   TYPES
======================= */
interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;

  width?: number;
  height?: number;
  fill?: boolean;

  className?: string;
  onClick?: () => void;

  fallbackSrc?: string;
}

/* =======================
   COMPONENT
======================= */
function AppImage({
  src,
  alt = 'Image',

  width,
  height,
  fill = false,

  className = '',
  onClick,

  fallbackSrc = '/assets/images/no_image.png',
  ...props
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const commonClassName = `
    ${className}
    ${isLoading ? 'bg-gray-200' : ''}
    ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
  `.trim();

  /* =======================
     FILL MODE
  ======================= */
  if (fill) {
    return (
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt={alt}
          className={`${commonClassName} absolute inset-0 w-full h-full object-cover`}
          onError={handleError}
          onLoad={handleLoad}
          onClick={onClick}
          {...props}
        />
      </div>
    );
  }

  /* =======================
     STANDARD IMAGE
  ======================= */
  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={commonClassName}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      {...props}
    />
  );
}

export default AppImage;
