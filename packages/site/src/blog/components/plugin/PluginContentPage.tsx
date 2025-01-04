import { ArticlePage, ArticlePageProps } from "@/components/article";
import React from "react";
import { threeColWrapper } from "@/components/with_wrapper";
import { useParams } from "react-router-dom";
import { usePluginOutput } from "@/components/plugin/hooks/usePluginOutput";
import { PluginManager } from "@/plugin/PluginManager";

type PluginContentPageProps = Omit<ArticlePageProps, "children">;

const ContentPage = (props: PluginContentPageProps) => {
  const { pluginRoute } = useParams();

  if (!pluginRoute || !PluginManager.instance) {
    return null;
  }

  const plugin = PluginManager.instance.getPluginByRoute(pluginRoute);
  if (!plugin) {
    return null;
  }

  const content = usePluginOutput(plugin.config.id);
  return (
    <ArticlePage {...props} title={plugin?.config.name || ""}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ArticlePage>
  );
};

export const PluginContentPage = threeColWrapper(ContentPage);
