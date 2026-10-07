import React from 'react';
import OriginalBlogSidebarMobile from '@theme-original/BlogSidebar/Mobile';
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common';
import type { Props } from '@theme/BlogSidebar/Mobile';
import type { CalendarArticle } from '../../../components/ArticleCalendar/types';
import { ArticleMonthNavigation, useCurrentCalendarArticle } from '../../../components/ArticleCalendar';

function MonthMenu({ current }: { current: CalendarArticle }) {
    return <ArticleMonthNavigation key={current.permalink} current={current} mobile />;
}

export default function BlogSidebarMobile(props: Props) {
    const current = useCurrentCalendarArticle();
    if (!current) return <OriginalBlogSidebarMobile {...props} />;
    return <NavbarSecondaryMenuFiller component={MonthMenu} props={{ current }} />;
}
