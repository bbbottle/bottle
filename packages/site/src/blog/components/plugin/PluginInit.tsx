import React, { useRef } from "react";
import { ReactNode, useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";
import { PluginManager } from "@/plugin/PluginManager";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { PluginInputForm } from "@/components/plugin/PluginInputFrom";
import { PluginInput } from "@/plugin/Plugin";

type inputResolve = (value: string | PromiseLike<string>) => void;

export const PluginInit = (props: { children: ReactNode }) => {
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const [open, setOpen] = React.useState(false);

  // encapsulate those two states and showForm into a hook
  const [input, setInput] = React.useState<PluginInput>();

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
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <Drawer.Portal>
          {/*<Drawer.Overlay className="fixed inset-0 bg-black/40" />*/}
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-50 outline-none w-[310px] flex"
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-2 text-zinc-900">
                  Plugin Input
                </Drawer.Title>
                <Drawer.Description className="text-zinc-600 mb-2"></Drawer.Description>
                <PluginInputForm
                  input={input as PluginInput}
                  onSubmit={(formData) => {
                    setOpen(false);
                    // document.body.style.pointerEvents = "auto"
                    console.log(resolveRef.current, formData);
                    resolveRef.current?.(formData);
                  }}
                />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
