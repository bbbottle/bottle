import React, { useState } from "react";
import { ArticlePage } from "@/components/article";
import { threeColWrapper } from "@/components/with_wrapper";
import { ImageUploader } from "@/components/ImageUploader";
import { UploadResult } from "@/types/upload";
import { Button } from "@bbki.ng/components";
import { copyToClipboard } from "@/utils";

const Upload = () => {
  const [source, setSource] = useState("");
  const buildSource = (result: UploadResult) =>
    `<Img
  src="${result.src}"
  height={${result.height}}
  width={${result.width}}
  renderedWidth={${result.width}}
  removeBlurBgAfterLoad
/>`;

  return (
    <ArticlePage title="图片素材上传">
      <>
        <ImageUploader
          onUploadSuccess={(res) => {
            setSource(buildSource(res));
          }}
        />
        {source && <pre>{source}</pre>}
        {source && (
          <Button className="m-16" onClick={() => copyToClipboard(source)}>
            复制代码
          </Button>
        )}
      </>
    </ArticlePage>
  );
};

export const UploadPage = Upload;
