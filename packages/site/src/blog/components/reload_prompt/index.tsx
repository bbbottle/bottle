import { useEffect, useRef } from "react";
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
    onRegisteredSW(swScriptUrl: string, r: ServiceWorkerRegistration) {
      console.log("SW registered: ", swScriptUrl, r);
    },
    onOfflineReady() {
      console.log("App is offline-ready");
    },
  });

  // Track if we've already shown the toast for this update
  const toastShown = useRef(false);

  useEffect(() => {
    // Only show toast once per update session
    if (needRefresh && !toastShown.current) {
      toastShown.current = true;
      
      toast("", {
        description: "发现新版本，是否更新？",
        duration: 10000,
        position: "bottom-right",
        actionButtonStyle: {
          backgroundColor: "#fff",
          color: "rgb(37,99,235)",
        },
        action: {
          label: "是",
          onClick: () => {
            // updateServiceWorker(true) will reload the page automatically
            updateServiceWorker(true);
          },
        },
        cancel: {
          label: "否",
          onClick: () => {
            // User dismissed the update
            setNeedRefresh(false);
            toastShown.current = false;
          },
        },
      });
    }
  }, [needRefresh]);

  return null;
};
