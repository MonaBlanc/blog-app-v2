import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, Range, getMarkRange, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect, useState } from "react";

import axios from "axios";
import ActionButton from "../common/ActionButton";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import EditLink from "./Link/EditLink";
import SEOForm from "./SeoForm";
import ThumbnailSelector from "./ThumbnailSelector";
import Toolbar from "./Toolbar";

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{src: string}[]>([]);
  
  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
    console.log(data);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);
    
    setImages([data, ...images]);
  };
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something cool...",
      }),
      Youtube.configure({
        width: 840,
        height: 480,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      })
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "outline-none prose prose-lg focus:outline-non dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  const handleImageSelection = (result: ImageSelectionResult) => {
      editor
        ?.chain()
        .focus()
        .setImage({ src: result.src, alt: result.altText })
        .run();
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);



  return (
    <>
      <div className="p-3  dark:bg-primary-dark transition">

        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary-light">

                  {/* Thumbnail Selector */}
        <div className="flex items-center justify-between mb-3">
          <ThumbnailSelector onChange={(file) => console.log(file)} />
          <div className="inline-block">
            <ActionButton title="Submit"/>
          </div>
        </div>

        {/* Title Input */}
        <input 
        type="text" 
        className="py-2 outline-none bg-transparent w-full border-0 border-b[1px] 
        border-secondary-dark dark:border-secondary-light text-3xl 
        font-semibold italic text-primary-dark dark:text-primary-light mb-3" 
        placeholder="Title"
        />
        <div className="h-[1px] w-full dark:bg-secondary-dark bg-secondary-light mb-3" />
        <Toolbar editor={editor} onOpenImageClick={() => setShowGallery(true)}/>
        <div className="h-[1px] w-full dark:bg-secondary-dark bg-secondary-light my-3" />
        </div>


        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full dark:bg-secondary-dark bg-secondary-light my-3" />
        <SEOForm onChange={(result) =>{}} />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onImageSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
