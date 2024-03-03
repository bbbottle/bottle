import { useTextPlainFile } from "@/hooks/use_text_plain_file";
import { useContext, useEffect } from "react";
import { usePost } from "@/hooks/use_post";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export type fileReader = (f: File) => void;
export const useFile2Post = (): fileReader => {
  const { content, title, reader } = useTextPlainFile();

  const { setIsLoading } = useContext(GlobalLoadingContext);

  const post = usePost();

  useEffect(() => {
    if (!content || !title) {
      return;
    }

    setIsLoading(true);

    post({ title, content })
      .then((r) => {
        console.log(r);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [title, content]);

  return (f: File) => {
    reader(f);
  };
};
