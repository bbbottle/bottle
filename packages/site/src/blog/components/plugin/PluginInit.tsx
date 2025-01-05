import React, { useCallback, useEffect } from "react";
import { ReactNode } from "react";
import { PluginInputForm } from "@/components/plugin/PluginInputForm";
import { useDependencies } from "@/components/plugin/hooks/useDependencies";
import { PluginManager } from "@/plugin/PluginManager";

export const PluginInit = (props: { children: ReactNode }) => {
  const {
    isPluginFormInputOpen,
    setPluginFormInputOpen,
    pluginInputFormConf,
    formDataResolver,

    ...dep
  } = useDependencies();

  useEffect(() => {
    PluginManager.init(dep).then();
  }, []);

  const onSubmit = useCallback(
    (formData: string) => {
      formDataResolver(formData);
      setPluginFormInputOpen(false);
    },
    [formDataResolver]
  );

  const onOpenChange = useCallback(
    (o: boolean) => {
      setPluginFormInputOpen(o);
      if (!o) {
        formDataResolver("");
      }
    },
    [formDataResolver]
  );

  return (
    <>
      {props.children}
      <PluginInputForm
        open={isPluginFormInputOpen}
        onOpenChange={onOpenChange}
        input={pluginInputFormConf}
        onSubmit={onSubmit}
      />
    </>
  );
};
