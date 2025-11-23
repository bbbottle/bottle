import { ArticlePage, ArticlePageProps } from "@/components/article";
import React, { useCallback, useEffect } from "react";
import { threeColWrapper } from "@/components/with_wrapper";
import { useParams } from "react-router-dom";
import { usePluginOutput } from "@/components/plugin/hooks/usePluginOutput";
import { PluginManager } from "@/plugin/PluginManager";
import { PluginConfig } from "@extism/extism";
import { PluginEvent } from "@/plugin/PluginEvent";

type PluginContentPageProps = Omit<ArticlePageProps, "children">;

const ContentPage = (props: PluginContentPageProps) => {
  const { pluginRoute } = useParams();

  const [c, setC] = React.useState<string>("");

  const onInstall = useCallback((plugin: PluginConfig) => {
    if (plugin.route !== pluginRoute) {
      return;
    }

    PluginManager.instance.run(plugin.id).then((result) => {
      setC(result);
    });
  }, []);

  useEffect(() => {
    PluginManager.addEventListener<PluginConfig>(
      PluginEvent.INSTALL,
      onInstall
    );

    return () => {
      PluginManager.removeEventListener<PluginConfig>(
        PluginEvent.INSTALL,
        onInstall
      );
    };
  }, []);

  const plugin = PluginManager.instance?.getPluginByRoute(pluginRoute || "");

  const content = usePluginOutput(plugin?.config.id) || c;

  return (
    <ArticlePage {...props} title={plugin?.config.route || ""}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ArticlePage>
  );
};

export const PluginContentPage = ContentPage;
