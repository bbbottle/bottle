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
    },
  });

  if (!needRefresh) {
    console.log("无需更新");
    return;
  }

  updateServiceWorker(false).then(() => {
    // @ts-ignore
    const appVer = GLOBAL_BBKING_VERSION;

    toast("", {
      description: "已自动更新到 v" + appVer + "。",
      position: "bottom-center",
    });

    setNeedRefresh(false);
  });

  return null;
};
