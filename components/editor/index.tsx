import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
    const editor = useEditor({extensions: [StarterKit]});
    return <EditorContent editor={editor} />;
}

export default Editor;