import DropdownOptions from "@/components/common/DropdownOptions";
import { Editor } from "@tiptap/react";
import { FC } from "react";

interface Props {
    editor: Editor | null;
}

const Toolbar: FC<Props> = ({editor}): JSX.Element | null => {
    if(!editor) return null;
    return (
        <div>
        {/* paragraph, heading 1, 2, 3 */}
        <DropdownOptions 
        options={[
            { label: "Paragraph", onClick: () => {
                editor.chain().focus().setParagraph().run();
            }},
            { label: "Heading 1", onClick: () => {
                editor.chain().focus().setHeading({level: 1}).run();
            }},
            { label: "Heading 2", onClick: () => {
                editor.chain().focus().setHeading({level: 2}).run();
            }},
            { label: "Heading 3", onClick: () => {
                editor.chain().focus().setHeading({level: 3}).run();
            }}
            ]}
            head = {<span>Paragrah</span>}
            />
        </div>
    );
    }

export default Toolbar;