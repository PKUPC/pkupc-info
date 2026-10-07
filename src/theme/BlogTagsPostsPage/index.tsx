import React from 'react';
import Layout from '@theme/Layout';
import { PageMetadata } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogTagsPostsPage';
import { ArticleCalendar, useCalendarArticles } from '../../components/ArticleCalendar';

export default function BlogTagsPostsPage({ tag }: Props) {
    const articles = useCalendarArticles().filter((article) => article.tagPermalinks.includes(tag.permalink));
    const title = `标签：${tag.label}`;
    return (
        <Layout>
            <PageMetadata title={title} description={tag.description} />
            <SearchMetadata tag="blog_tags_posts" />
            <ArticleCalendar
                articles={articles}
                title={tag.label}
                description={tag.description}
                allTagsPath={tag.allTagsPath}
            />
        </Layout>
    );
}
