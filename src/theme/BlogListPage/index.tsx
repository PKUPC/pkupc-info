import React from 'react';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import Layout from '@theme/Layout';
import { PageMetadata } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { Props } from '@theme/BlogListPage';
import { CalendarHome } from '../../components/ArticleCalendar';

export default function BlogListPage(props: Props) {
    const root = useBaseUrl('/wechat-official-account');
    if (props.metadata.permalink.replace(/\/$/, '') !== root.replace(/\/$/, '')) {
        return <OriginalBlogListPage {...props} />;
    }
    return (
        <Layout>
            <PageMetadata title="公众号文章" description="按年份与月份浏览 PKU谜协公众号文章。" />
            <CalendarHome />
        </Layout>
    );
}
