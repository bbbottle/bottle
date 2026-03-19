import React, { useContext } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Cover, Streaming } from './pages';
import { Nav, NotFound, Page, Grid, ErrorBoundary, Container } from '@bbki.ng/ui';

import ArticlePage from '@/pages/extensions/txt/article';
import Txt from '@/pages/extensions/txt';

import { usePaths } from '@/hooks';
import { SWR } from '@/swr';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { BotRedirect } from '@/pages/bot';
import { BBContext } from '@/context/bbcontext';
import { useDynamicLogo } from './hooks/use_dynamic_logo';

const Layout = () => {
  const paths = usePaths();
  const { isLoading } = useContext(GlobalLoadingContext);
  const logo = useDynamicLogo();

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
      main={
        <Grid leftAside={<div />} rightAside={<div />}>
          <Container className="py-32">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Container>
        </Grid>
      }
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
