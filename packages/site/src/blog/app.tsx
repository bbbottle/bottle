import React, { useContext, useMemo } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Nav, NotFound, Page } from '@bbki.ng/components';
import { Cover, Streaming } from './pages';

import ArticlePage from '@/pages/extensions/txt/article';
import Txt from '@/pages/extensions/txt';

import { usePaths } from '@/hooks';
import { Login } from '@/pages/login';
import { SWR } from '@/swr';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { BotRedirect } from '@/pages/bot';
import { BBContext } from '@/context/bbcontext';
import { ThreeColLayout, ErrorBoundary } from '@bbki.ng/components';
import { useDynamicLogo } from './hooks/use_dynamic_logo';

const Layout = () => {
  const paths = usePaths();
  const { isLoading } = useContext(GlobalLoadingContext);
  const logo = useDynamicLogo();

  const middleRenderer = useMemo(() => {
    return () => (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    );
  }, []);

  return (
    <Page
      nav={
        <Nav
          paths={paths}
          className="gradient-blur-cover select-none"
          loading={isLoading}
          customLogo={logo}
        />
      }
      main={<ThreeColLayout middleRenderer={middleRenderer} />}
    />
  );
};

export const App = () => {
  return (
    <SWR>
      <BBContext>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Cover />} />

            <Route path="blog" element={<Outlet />}>
              <Route path="" element={<Txt />} />
              <Route path=":title" element={<ArticlePage />} />
            </Route>

            <Route path="bot" element={<BotRedirect />} />
            <Route path="now" element={<Streaming />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BBContext>
    </SWR>
  );
};

export default App;
