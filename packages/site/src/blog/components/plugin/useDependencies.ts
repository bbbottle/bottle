import { Dependencies } from "@/plugin/Dependencies";
import React, { useContext, useRef } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";
import { PluginInput } from "@/plugin/Plugin";
import { toast } from "sonner";

type inputResolve = (value: string | PromiseLike<string>) => void;

interface depHooksRes extends Dependencies {
  setPluginFormInputOpen: (open: boolean) => void;
  isPluginFormInputOpen: boolean;
  pluginInputFormConf: PluginInput;
  formDataResolver: inputResolve;
}

export const useDependencies = (): depHooksRes => {
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const [open, setOpen] = React.useState(false);

  const [input, setInput] = React.useState<PluginInput>([]);

  const resolveRef = useRef<inputResolve>();

  return {
    loading: setIsLoading,
    toast: (content: string) => {
      toast.success(content, {
        position: "top-center",
      });
    },
    showForm: async (input) => {
      setOpen(true);
      setInput(input);
      return new Promise<string>((resolve) => {
        resolveRef.current = resolve;
      });
    },
    setPluginFormInputOpen: setOpen,
    isPluginFormInputOpen: open,
    pluginInputFormConf: input,
    formDataResolver: resolveRef.current as inputResolve,
  };
};
