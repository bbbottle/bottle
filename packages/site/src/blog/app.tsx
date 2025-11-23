import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav, NotFound, Page } from "@bbki.ng/components";
import { HotKeyNav } from "./components";
import { threeColWrapper } from "@/components/with_wrapper";
import { Cover } from "./pages";

import ArticlePage from "@/pages/extensions/txt/article";
import NowPage from "@/pages/now";
import PhotoProjects from "@/pages/extensions/png/png_projects";
import Tags from "@/pages/tags";
import TagsResult from "@/pages/tags/tag_result";
import Txt from "@/pages/extensions/txt";

import { usePaths } from "@/hooks";
import { Login } from "@/pages/login";
import { SWR } from "@/swr";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { UploadPage } from "@/pages/upload";
import { AppCtxMenu } from "@/components/app_ctx_menu";
import { Pochacco, PochaccoPose } from "@/components/Pochacco/Pochacco";
import { Role, useRole } from "@/hooks/use_role";
import { BotRedirect } from "@/pages/bot";
import { BBContext } from "@/context/bbcontext";
import { PluginContentPage } from "@/components/plugin/PluginContentPage";
import { PluginRoutes } from "@/components/plugin/PluginRoutes";
import { useClipboardToPost } from "@/hooks/use_clipboard_to_post";
import { useSharedStringToPost } from "@/hooks/use_shared_string_to_post";
import { ThreeColLayout, ErrorBoundary } from "@bbki.ng/components";

const Layout = () => {
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const role = useRole();
  const isQueen = role === Role.QUEEN;
  return (
    <Page
      nav={
        <AppCtxMenu>
          <Nav
            paths={usePaths()}
            className="gradient-blur-cover select-none"
            loading={isLoading}
            customLogo={
              isQueen ? <Pochacco pose={PochaccoPose.Watching} /> : null
            }
          />
        </AppCtxMenu>
      }
      main={
        <ThreeColLayout
          middleRenderer={() => {
            return (
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            );
          }}
        />
      }
    />
  );
};

export const App = () => {
  useClipboardToPost();

  useSharedStringToPost();

  return (
    <SWR>
      <HotKeyNav>
        <BBContext>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Cover />} />

              <Route path="blog" element={<Outlet />}>
                <Route path="" element={<Txt />} />
                <Route path=":title" element={<ArticlePage />} />
              </Route>

              <Route path="tags" element={<Tags />} />
              <Route path="tags/:tag" element={<TagsResult />} />

              <Route path="bot" element={<BotRedirect />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BBContext>
      </HotKeyNav>
    </SWR>
  );
};

export default App;
