import { DialogProps, Drawer } from "vaul";
import React, { ReactNode } from "react";

type PluginDrawerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
} & Pick<DialogProps, "open"> &
  Pick<DialogProps, "onOpenChange">;

export const PluginDrawer = (props: PluginDrawerProps) => {
  const { children, title, description, open, onOpenChange } = props;

  return (
    <Drawer.Root
      direction="bottom"
      open={open}
      onOpenChange={onOpenChange}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Content className="bg-gray-100 flex flex-col {/*rounded-t-[10px]*/} mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none border-t border-gray-200">
          <div className="p-4 bg-white {/*rounded-t-[10px]*/} flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto my-32 p-16">
              <Drawer.Title className="font-medium mb-2 text-zinc-900">
                {title}
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-2">
                {description}
              </Drawer.Description>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
