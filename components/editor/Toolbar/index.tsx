import DropdownOptions from "@/components/common/DropdownOptions";
import { Editor } from "@tiptap/react";
import { FC } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  BsBraces,
  BsCode,
  BsImageFill,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
  BsYoutube
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { getFocusedEditor } from "../EditorUtils";
import InsertLink from "../Link/InsertLink";
import { linkOption } from "../Link/LinkForm";
import Button from "./Button";
import EmbedYoutube from "./EmbedYoutube";

interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

const Toolbar: FC<Props> = ({ editor, onOpenImageClick }): JSX.Element | null => {
  if (!editor) return null;
  const options = [
    {
      label: "Paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () =>  getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

    const getLabel = (): string => {
        if (editor.isActive("heading", { level: 1 })) return "Heading 1";
        if (editor.isActive("heading", { level: 2 })) return "Heading 2";
        if (editor.isActive("heading", { level: 3 })) return "Heading 3";
        return "Paragraph";
    };

    const handleLinkSubmit = ({url, openInNewTab}: linkOption) => {
      editor.commands.setLink({href: url, target: openInNewTab ? "_blank" : "_self"});
    };

    const handleEmbedYoutube = (url: string) => {
      editor.chain().focus().setYoutubeVideo({src: url}).run();  
    };

  const Head = () => {
    return (
    <div className="flex items-center space-x-2 text-primary-dark dark:text-primary-light">
        <p>{getLabel()}</p>
        <AiFillCaretDown />
    </div>
    );
};

  return (
    <div className="flex items-center">
      {/* paragraph, heading 1, 2, 3 */}
      <DropdownOptions options={options} head={<Head />} />

      <div className="h-4 w-[1px] dark:bg-secondary-dark bg-secondary-light mx-8" />

      <div className="flex items-center spacce-x-3">

      <Button active={editor.isActive('bold')} onClick={() => getFocusedEditor(editor).toggleBold().run()}>
        <BsTypeBold />
      </Button>
      <Button active={editor.isActive('italic')} onClick={() =>  getFocusedEditor(editor).toggleItalic().run()} >
        <BsTypeItalic />
      </Button>
      <Button active={editor.isActive('underline')} onClick={() =>  getFocusedEditor(editor).toggleUnderline().run()} >
        <BsTypeUnderline />
      </Button>
      <Button active={editor.isActive('strike')} onClick={() =>  getFocusedEditor(editor).toggleStrike().run()} >
        <BsTypeStrikethrough />
      </Button>
      </div>
      <div className="h-4 w-[1px] dark:bg-secondary-dark bg-secondary-light mx-8" />
      <div className="flex items-center spacce-x-3">
      <Button active={editor.isActive('quote')} onClick={() =>  getFocusedEditor(editor).toggleBlockquote().run()} >
        <RiDoubleQuotesL />
      </Button>
      <Button active={editor.isActive('bullet list')} onClick={() =>  getFocusedEditor(editor).toggleBulletList().run()} >
        <BsListUl />
      </Button>
      <Button active={editor.isActive('ordered list')} onClick={() =>  getFocusedEditor(editor).toggleOrderedList().run()} >
        <BsListOl />
      </Button>
      <Button active={editor.isActive('code block')} onClick={() =>  getFocusedEditor(editor).toggleCodeBlock().run()} >
        <BsBraces />
      </Button>
      <Button active={editor.isActive('code')} onClick={() =>  getFocusedEditor(editor).toggleCode().run()} >
        <BsCode />
      </Button>
      <InsertLink onSubmit={handleLinkSubmit}/>
      </div>
      <div className="h-4 w-[1px] bg-secondary-light mx-8" />
      <div className="flex items-center spacce-x-3">
      <Button onClick={onOpenImageClick} >
        <BsImageFill />
      </Button>
      <EmbedYoutube onSubmit={handleEmbedYoutube} />
      </div>
    </div>
  );
};

export default Toolbar;
