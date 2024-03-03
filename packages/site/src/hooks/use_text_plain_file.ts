import { useEffect, useState } from "react";

export type Result = {
  content: string;
  title: string;
  reader: (f: File) => void;
};

export const useTextPlainFile = (): Result => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const reader = new FileReader();

  useEffect(() => {
    if (file != null) {
      reader.readAsText(file, "utf-8");
    }

    reader.onload = function () {
      setContent(reader.result as string);
    };

    return () => {
      reader.onload = null;
    };
  }, [file]);

  return {
    content,
    title: file?.name ?? "",
    reader: (f: File) => {
      setFile(f);
    },
  };
};
