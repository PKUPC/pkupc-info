import React from 'react';
import OriginalBlogSidebarDesktop from '@theme-original/BlogSidebar/Desktop';
import type { Props } from '@theme/BlogSidebar/Desktop';
import { ArticleMonthNavigation, useCurrentCalendarArticle } from '../../../components/ArticleCalendar';

export default function BlogSidebarDesktop(props: Props) {
    const current = useCurrentCalendarArticle();
    if (!current) return <OriginalBlogSidebarDesktop {...props} />;
    return (
        <aside className="col col--3">
            <ArticleMonthNavigation key={current.permalink} current={current} />
        </aside>
    );
}
