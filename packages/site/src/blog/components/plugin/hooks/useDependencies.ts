import { Dependencies } from "@/plugin/Dependencies";
import React, { useContext, useRef } from "react";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { PluginInput } from "@/plugin/Plugin";
import { toast } from "sonner";
import { GlobalRoutesContext } from "@/context/global_routes_provider";
import { PluginManager } from "@/plugin/PluginManager";

type inputResolve = (value: string | PromiseLike<string>) => void;

interface depHooksRes extends Dependencies {
  setPluginFormInputOpen: (open: boolean) => void;
  isPluginFormInputOpen: boolean;
  pluginInputFormConf: PluginInput;
  formDataResolver: inputResolve;
  pluginUIRef: React.MutableRefObject<{
    open: boolean;
    setHtml: (html: string) => void;
  } | null>
}

export const useDependencies = (): depHooksRes => {
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const [open, setOpen] = React.useState(false);

  const [input, setInput] = React.useState<PluginInput>([]);

  const resolveRef = useRef<inputResolve>();

  const globalRouteCtx = useContext(GlobalRoutesContext);

  const pluginUIRef = useRef<{ open: boolean; setHtml: (html: string) => void } | null>(null);

  return {
    callPlugin: (id, method) => {
      if (!PluginManager.instance) {
        return Promise.reject("Plugin manager not initialized");
      }

      return PluginManager.instance.run(id, method);
    },
    addRoute: (name, to) => {
      globalRouteCtx.addGlobalRoute({
        name,
        to: "/plugins/" + to,
      });
    },
    removeRoute: (name) => {
      globalRouteCtx.removeGlobalRoute(name);
    },
    loading: setIsLoading,
    toast: (content: string) => {
      toast.success(content, {
        position: "bottom-right",
      });
    },
    showUI: (html: string) => {
      if (!pluginUIRef.current) {
        return;
      }
      pluginUIRef.current.setHtml(html);
    },
    showForm: async (input) => {
      setOpen(true);
      setInput(input);
      return new Promise<string>((resolve) => {
        resolveRef.current = resolve;
      });
    },
    pluginUIRef,
    setPluginFormInputOpen: setOpen,
    isPluginFormInputOpen: open,
    pluginInputFormConf: input,
    formDataResolver: resolveRef.current as inputResolve,
  };
};
