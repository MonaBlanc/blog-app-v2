import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import Toolbar from "./Toolbar";

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
  const editor = useEditor({ extensions: [StarterKit] });
  return (
    <div>
        <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
