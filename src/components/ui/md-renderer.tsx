import MDEditor from "@uiw/react-md-editor";

const MDRenderer = ({ source }: { source: string }) => {
  return (
    <MDEditor.Markdown
      source={source}
      className="!bg-transparent !text-foreground !font-fira"
    />
  );
};

export default MDRenderer;
