import React, { useContext } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Nav, NotFound, Page } from '@bbki.ng/components';
import { HotKeyNav } from './components';
import { Cover, Streaming } from './pages';

import ArticlePage from '@/pages/extensions/txt/article';
import Txt from '@/pages/extensions/txt';

import { usePaths } from '@/hooks';
import { Login } from '@/pages/login';
import { SWR } from '@/swr';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { AppCtxMenu } from '@/components/app_ctx_menu';
import { BotRedirect } from '@/pages/bot';
import { BBContext } from '@/context/bbcontext';
import { useClipboardToPost } from '@/hooks/use_clipboard_to_post';
import { useSharedStringToPost } from '@/hooks/use_shared_string_to_post';
import { ThreeColLayout, ErrorBoundary } from '@bbki.ng/components';
import { useDynamicLogo } from './hooks/use_dynamic_logo';

const Layout = () => {
  const { isLoading } = useContext(GlobalLoadingContext);
  const logo = useDynamicLogo();
  return (
    <Page
      nav={
        <AppCtxMenu>
          <Nav
            paths={usePaths()}
            className="gradient-blur-cover select-none"
            loading={isLoading}
            customLogo={logo}
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

              <Route path="bot" element={<BotRedirect />} />
              <Route path="login" element={<Login />} />
              <Route path="now" element={<Streaming />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BBContext>
      </HotKeyNav>
    </SWR>
  );
};

export default App;
