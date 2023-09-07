import CheckMark from "@/components/common/CheckMark";
import NextImage from "next/legacy/image";
import { FC } from "react";

interface Props {
  src: string;
  selected?: boolean;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent the click event from propagating up
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div onClick={handleClick} className="relative rounded overflow-hidden cursor-pointer">
      <NextImage
        src={src}
        width={200}
        height={200}
        alt="gallery"
        objectFit="cover"
        className="bg-secondary-light hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false}/>
      </div>
    </div>
  );
};

export default Image;
