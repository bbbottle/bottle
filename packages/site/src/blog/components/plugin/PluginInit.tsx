import React, { useCallback, useEffect } from "react";
import { ReactNode } from "react";
import { PluginInputForm } from "@/components/plugin/PluginInputForm";
import { useDependencies } from "@/components/plugin/hooks/useDependencies";
import { PluginManager } from "@/plugin/PluginManager";
import PluginUI from "./pluginUI/PluginUI";

export const PluginInit = (props: { children: ReactNode }) => {
  const {
    isPluginFormInputOpen,
    setPluginFormInputOpen,
    pluginInputFormConf,
    formDataResolver,

    pluginUIRef,

    ...dep
  } = useDependencies();

  useEffect(() => {
    PluginManager.init(dep)
      .then()
      .catch((e: any) => {
        dep.toast("Failed to initialize plugin manager: " + e?.message);
        dep.loading(false);
      });
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
      <PluginUI ref={pluginUIRef} />
    </>
  );
};
