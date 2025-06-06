import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React from 'react';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--custom', 'text-center relative overflow-hidden p-8 w996:pt-16 w996:pb-16')}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className="flex items-center justify-center">
                    <Link
                        className="button button--primary hero--button button--lg"
                        to="https://pnku3.pkupuzzle.art/home"
                    >
                        <span className="hero--button-text">刚刚过去的活动：P&KU 3（上）</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): React.ReactNode {
    return (
        <Layout title={''} description="这里是 Puzzle and Key Universe 资料站，一起来享受解谜的乐趣吧！">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
