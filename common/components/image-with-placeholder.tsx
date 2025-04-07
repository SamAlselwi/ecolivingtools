'use client';
import React, { useState } from 'react';

interface ImageWithPlaceholderProps {
  src: string;
  alt?: string;
  linkHref?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt = '',
  linkHref,
  width = '100%',
  height = 200,
  className,
}) => {

  // Detect SSR
  // const isSSR = typeof window === "undefined";

  const [loading, setLoading] = useState(false);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        display: loading ? 'none' : 'block',
        width,
        height: 'auto',
      }}
      onLoad={() => setLoading(false)}
    />
  );

  return (
    <div className="relative" style={{ width }}>
      {/* Placeholder / Skeleton */}
      {loading && (
        <div
          className="animate-pulse bg-gray-200"
          style={{ width, height }}
        />
      )}
      {/* If linkHref is provided, wrap image with an <a> */}
      {linkHref ? <a href={linkHref}>{imageElement}</a> : imageElement}
    </div>
  );
};

export default ImageWithPlaceholder;
