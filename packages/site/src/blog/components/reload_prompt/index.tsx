import { useEffect } from "react";
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

  useEffect(() => {
    if (needRefresh) {
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
            updateServiceWorker(false).then(() => {
              // @ts-ignore
              toast("", {
                description: `已更新`,
                position: "bottom-right",
              });
              setNeedRefresh(false);
            });
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRefresh]);

  return null;
};
