import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container mt-32">
        <h1 className="hero__title pb-64">{siteConfig.title}</h1>
        <p className="hero__subtitle">🚧 {siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="something behind bbki.ng"
    >
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
