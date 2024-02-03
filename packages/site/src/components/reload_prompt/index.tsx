import React, { useEffect } from "react";
import { toast } from "sonner";

// @ts-ignore
import { useRegisterSW } from "virtual:pwa-register/react";

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error: any) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    // setOfflineReady(false);
    setNeedRefresh(false);
  };

  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;

  useEffect(() => {
    if (!needRefresh) {
      return;
    }

    toast("", {
      description: "检测到更新，当前 v" + appVer + "。是否更新？",
      position: "bottom-center",
      actionButtonStyle: {
        backgroundColor: "#fff",
        color: "rgb(37,99,235)",
      },
      action: {
        label: "是",
        onClick: () => {
          if (!needRefresh) {
            setNeedRefresh(false);
            return;
          }
          updateServiceWorker(true);
        },
      },
    });
  }, []);

  return null;
};
