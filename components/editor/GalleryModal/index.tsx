import ActionButton from "@/components/common/ActionButton";
import ModalContainer, { ModalProps } from "@/components/common/ModalContainer";
import Image from "next/image";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Gallery from "./Gallery";

export interface ImageSelectionResult {
  src: string;
  altText?: string;
}

interface Props extends ModalProps {
  images: { src: string }[];
  uploading?: boolean;
  onImageSelect(image: File): void;
  onSelect(result: ImageSelectionResult): void;
}

const GalleryModal: FC<Props> = ({
  visible,
  images,
  uploading,
  onImageSelect,
  onSelect,
  onClose,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("image")) return handleClose();
    onImageSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage });
    handleClose();
  };

  // Prevent the click event from propagating and closing the modal
  const handleModalContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div
        className="max-w-4xl p-2 rounded bg-primary-dark dark:bg-primary-light"
        onClick={handleModalContentClick}
      >
        <div className="flex">
          {/*gallery images*/}
          <div className="basis-[75%] max-h-[450px] overflow-y-auto">
            <Gallery
              images={images}
              selectedImage={selectedImage}
              uploading={uploading}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>
          {/*image actions*/}
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleOnImageChange}
                  hidden
                  type="file"
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>

              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full rounded border-2
                      border-secondary-dark focus:ring-1 text-primary-light 
                      dark:text-primary-dark h-32 p-1"
                    placeholder="Enter some alt text..."
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>

                  <ActionButton onClick={handleSelection} title="Select" />

                  <div className="relative aspect-square">
                    <Image
                      alt="gallery image"
                      src={selectedImage}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;