import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Nav, Page, NotFound } from "@bbki.ng/components";
import { HotKeyNav, Stickers } from "./components";
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

const Layout = () => {
  const { isLoading } = useContext(GlobalLoadingContext);
  return (
    <>
      <Page
        nav={
          <Nav paths={usePaths()} className="blur-cover" loading={isLoading} />
        }
        main={<Outlet />}
        footer={null}
      />
    </>
  );
};

const NowInMidCol = threeColWrapper(NowPage);
const ContentInMidCol = threeColWrapper(Txt);
const ArticleInMidCol = threeColWrapper(ArticlePage);
const TagsInMidCol = threeColWrapper(Tags);
const LoginInMidCol = threeColWrapper(Login);
const TagsResultInMidCol = threeColWrapper(TagsResult);
const CoverInMidCol = threeColWrapper(Cover);

export const App = () => {
  return (
    <SWR>
      <HotKeyNav>
        <Stickers />
        <GlobalLoadingStateProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CoverInMidCol />} />

              <Route path="/projects" element={<Png />} />
              <Route path="/projects/:id" element={<PhotoProjects />} />

              <Route path="blog" element={<ContentInMidCol />} />
              <Route path="blog/:title" element={<ArticleInMidCol />} />
              <Route path="blog/:title/:id" element={<PhotoProjects />} />
              <Route path="tags" element={<TagsInMidCol />} />
              <Route path="tags/:tag" element={<TagsResultInMidCol />} />

              <Route path="now" element={<NowInMidCol />} />
              <Route path="login" element={<LoginInMidCol />} />
              <Route path="upload" element={<UploadPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalLoadingStateProvider>
      </HotKeyNav>
    </SWR>
  );
};

export default App;
