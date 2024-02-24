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
    onOfflineReady() {
      console.log("App is offline-ready");
      toast("", {
        description: "已支持离线访问。",
        position: "bottom-center",
        actionButtonStyle: {
          backgroundColor: "#fff",
          color: "rgb(37,99,235)",
        },
      });
    },
  });

  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;

  useEffect(() => {
    if (!needRefresh) {
      console.log("版本 v" + appVer + "，无需更新。");
      return;
    }

    toast("", {
      description: "检测到更新，当前版本 v" + appVer + "。是否更新？",
      dismissible: false,
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
  }, [needRefresh]);

  return null;
};
