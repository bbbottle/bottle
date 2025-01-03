import React, { useRef } from "react";
import { ReactNode, useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";
import { PluginManager } from "@/plugin/PluginManager";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { PluginInputForm } from "@/components/plugin/PluginInputForm";
import { PluginInput } from "@/plugin/Plugin";

type inputResolve = (value: string | PromiseLike<string>) => void;

export const PluginInit = (props: { children: ReactNode }) => {
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const [open, setOpen] = React.useState(false);

  // encapsulate those two states and showForm into a hook
  const [input, setInput] = React.useState<PluginInput>([]);

  const resolveRef = useRef<inputResolve>();

  useEffect(() => {
    PluginManager.init({
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
    });
  }, []);

  return (
    <>
      {props.children}
      <PluginInputForm
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            resolveRef.current?.("");
          }
        }}
        input={input}
        onSubmit={(formData) => {
          setOpen(false);
          // document.body.style.pointerEvents = "auto"
          console.log(resolveRef.current, formData);
          resolveRef.current?.(formData);
        }}
      />
    </>
  );
};
