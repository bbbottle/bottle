import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav, NotFound, Page, BlurCover } from "@bbki.ng/components";
import { HotKeyNav } from "./components";
import { threeColWrapper } from "@/components/with_wrapper";
import { Cover } from "./pages";

import Png from "@/pages/extensions/png";
import ArticlePage from "@/pages/extensions/txt/article";
import NowPage from "@/pages/now";
import PhotoProjects from "@/pages/extensions/png/png_projects";
import Tags from "@/pages/tags";
import TagsResult from "@/pages/tags/tag_result";
import Txt from "@/pages/extensions/txt";

import { usePaths } from "@/hooks";
import { Login } from "@/pages/login";
import { SWR } from "@/swr";
import {
  GlobalLoadingContext,
  GlobalLoadingStateProvider,
} from "@/global_loading_state_provider";
import { UploadPage } from "@/pages/upload";
import { AppCtxMenu } from "@/components/app_ctx_menu";
import { Pochacco, PochaccoPose } from "@/components/Pochacco/Pochacco";
import { Role, useRole } from "@/hooks/use_role";
import { EffectContextProvider } from "@/components/effect-layer/EffectContextProvider";
import { BotRedirect } from "@/pages/bot";

const Layout = () => {
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const role = useRole();
  const isQueen = role === Role.QUEEN;
  return (
    <>
      <Page
        nav={
          <AppCtxMenu>
            <Nav
              paths={usePaths()}
              className="blur-cover select-none"
              loading={isLoading}
              customLogo={
                isQueen ? <Pochacco pose={PochaccoPose.Watching} /> : null
              }
            />
          </AppCtxMenu>
        }
        main={<Outlet />}
      />
      <BlurCover status={isFontLoading ? "show" : "silent"} />
    </>
  );
};

const NowInMidCol = threeColWrapper(NowPage);
const ContentInMidCol = threeColWrapper(Txt);
const ProjectsInMidCol = threeColWrapper(Png);
const ArticleInMidCol = threeColWrapper(ArticlePage);
const TagsInMidCol = threeColWrapper(Tags);
const LoginInMidCol = threeColWrapper(Login);
const TagsResultInMidCol = threeColWrapper(TagsResult);
const CoverInMidCol = threeColWrapper(Cover);

export const App = () => {
  return (
    <SWR>
      <EffectContextProvider>
        <HotKeyNav>
          <GlobalLoadingStateProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<CoverInMidCol />} />

                <Route path="/projects" element={<ProjectsInMidCol />} />
                <Route path="/projects/:id" element={<PhotoProjects />} />

                <Route path="blog" element={<ContentInMidCol />} />
                <Route path="blog/:title" element={<ArticleInMidCol />} />
                <Route path="blog/:title/:id" element={<PhotoProjects />} />
                <Route path="tags" element={<TagsInMidCol />} />
                <Route path="tags/:tag" element={<TagsResultInMidCol />} />

                <Route path="bot" element={<BotRedirect />} />
                <Route path="now" element={<NowInMidCol />} />
                <Route path="login" element={<LoginInMidCol />} />
                <Route path="upload" element={<UploadPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GlobalLoadingStateProvider>
        </HotKeyNav>
      </EffectContextProvider>
    </SWR>
  );
};

export default App;
