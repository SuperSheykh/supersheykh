import MDEditor from "@uiw/react-md-editor";
import type { MDEditorProps } from "@uiw/react-md-editor";

type Props = MDEditorProps & {
  placeholder?: string;
};

const MDTextArea = ({ placeholder, ...rest }: Props) => {
  return (
    <MDEditor
      style={{
        color: "var(--foreground)",
      }}
      className="!text-foreground min-h-[300px] !font-fira !border-input !bg-input/30 !rounded-none darK:!bg-input/30"
      textareaProps={{
        placeholder,
      }}
      {...rest}
    />
  );
};

export default MDTextArea;
