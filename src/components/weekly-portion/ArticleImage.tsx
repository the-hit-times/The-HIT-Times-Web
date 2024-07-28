import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface ArticleImageProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-full h-full bg-gray-200 rounded-md animate-pulse "></div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-full h-full flex bg-red-100 rounded-md items-center">
            <div className="mx-auto flex flex-col items-center">
              <ExclamationCircleIcon className="h-6 w-6 text-red-800" />
              <p className="text-red-800">Failed to load image</p>
            </div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-200 ${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        width={width}
        height={height}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />
    </div>
  );
};

export default ArticleImage;
