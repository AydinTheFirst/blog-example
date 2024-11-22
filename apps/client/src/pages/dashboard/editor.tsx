import { Button } from "@nextui-org/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const ContentEditor = () => {
  const [value, setValue] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Content copied to clipboard");
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <Button color="primary" onPress={handleCopy}>
          <strong>Copy Content</strong>
        </Button>
      </div>
      <div>
        <ReactQuill
          className="rounded border bg-content2"
          modules={modules}
          onChange={setValue}
          theme="snow"
          value={value}
        />
      </div>
      <div className="no-reset" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default ContentEditor;
