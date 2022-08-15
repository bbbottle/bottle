import React, { useContext } from "react";
import { DropImage } from "@bbki.ng/components";
import { AuthRequired } from "@/auth_required";
import { useUploader } from "@/hooks/use_uploader";
import { ImageUploaderProps } from "@/types/upload";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export const ImageUploader = (props: ImageUploaderProps) => {
  const {
    onUploadFinish,
    onUploadError = () => {},
    onUploadSuccess = () => {},
    onBeforeUpload = () => Promise.resolve(),
    projectId,
    projectName,
    ...rest
  } = props;

  const { setIsLoading } = useContext(GlobalLoadingContext);
  const uploader = useUploader();

  return (
    <AuthRequired shouldBeKing>
      <DropImage
        {...rest}
        className="mb-256"
        onUploadFinish={onUploadFinish}
        uploader={async (file) => {
          await onBeforeUpload();
          setIsLoading(true);
          try {
            const res = await uploader(
              projectId || "",
              projectName || "",
              file
            );
            await onUploadSuccess(res);
            return setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            onUploadError();
            console.error(e, "failed to upload image.");
          }
        }}
        ghost
      >
        {() => null}
      </DropImage>
    </AuthRequired>
  );
};
