import { ImageDropProps } from "@bbki.ng/components/lib";

export type UploadResult = {
  width: number;
  height: number;
  src: string;
};

export interface ImageUploaderProps
  extends Pick<ImageDropProps<undefined>, "onUploadFinish" | "placeholder"> {
  onBeforeUpload?: () => void;
  onUploadError?: () => void;
  onUploadSuccess?: (res: UploadResult) => void;
  projectId?: string;
  projectName?: string;
}
