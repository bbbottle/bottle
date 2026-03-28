import React, { useContext, useEffect } from 'react';
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
import { Slot } from '../core/components/SlotComp';
import { pluginManager } from '#/core/pluginManager';

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
          style={{
            paddingTop: 'var(--safe-top);',
            transition: 'all .2s ease-in-out',
          }}
        />
      }
      main={
        <Grid
          leftAside={
            <div className="py-32 px-6">
              <Slot name="leftCol" data={paths} />
            </div>
          }
          rightAside={
            <div className="py-32 px-6">
              <Slot name="rightCol" data={paths} />
            </div>
          }
        >
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
  // useEffect(() => {
  //   pluginManager.loadPlugin('test');

  //   return () => {
  //     pluginManager.disablePlugin('test');
  //   };
  // }, []);

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
