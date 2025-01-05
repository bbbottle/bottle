import React, { useContext } from "react";
import { DropImage } from "@bbki.ng/components";
import { useUploader } from "@/hooks/use_uploader";
import { ImageUploaderProps } from "@/types/upload";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { Auth } from "@/components/Auth";
import { Role } from "@/hooks/use_role";
import { useParams } from "react-router-dom";

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
  const isProjectOfQueen = projectName === "小乌鸦";
  const role = isProjectOfQueen ? [Role.QUEEN, Role.KING] : [Role.KING];

  return (
    <Auth role={role}>
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
    </Auth>
  );
};
