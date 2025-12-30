import React from "react";
import { Button, ButtonType } from "@bbki.ng/components";
import { ShareIcon } from "./share-icon";
import { toast } from "sonner";

export const ShareBtn = ({ shareInfo }: { shareInfo: ShareData }) => {
  const handleShare = async () => {
    try {
      await navigator.share(shareInfo);
      toast.success("已分享");
    } catch (error) {
      const isAbortError = (error as Error).name === "AbortError";
      if (isAbortError) {
        return;
      }

      toast.error((error as Error).message);
    }
  };

  return (
    <Button
      size="small"
      className="text-gray-400 hover:text-gray-600 transition-colors ease-in duration-200"
      type={ButtonType.GHOST}
      onClick={handleShare}
    >
      <ShareIcon />
    </Button>
  );
};
