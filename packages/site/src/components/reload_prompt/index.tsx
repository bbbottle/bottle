import { toast } from "sonner";

// @ts-ignore
import { useRegisterSW } from "virtual:pwa-register/react";

const intervalMS = 3000;

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
      r &&
        setInterval(async () => {
          if (!(!r.installing && navigator)) return;

          if ("connection" in navigator && !navigator.onLine) return;

          const resp = await fetch(swScriptUrl, {
            cache: "no-store",
            headers: {
              cache: "no-store",
              "cache-control": "no-cache",
            },
          });

          if (resp?.status === 200) {
            await r.update();
          }
        }, intervalMS);
    },
    onOfflineReady() {
      console.log("App is offline-ready");
    },
  });

  if (!needRefresh) {
    return null;
  }

  toast("", {
    description: "发现新版本，是否更新？",
    duration: 10000,
    position: "top-center",
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
            position: "top-center",
          });
          setNeedRefresh(false);
        });
      },
    },
  });

  return null;
};
