import type { Plugin } from '@docusaurus/types';
import type { BlogPost } from '@docusaurus/plugin-content-blog';
import type { ArticleCalendarData, CalendarArticle } from '../components/ArticleCalendar/types';

const shanghaiDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

export function buildArticleCalendar(blogPosts: BlogPost[]): ArticleCalendarData {
    const articles = blogPosts
        .filter(({ metadata }) => !metadata.unlisted && !metadata.frontMatter.draft)
        .map(({ metadata }): CalendarArticle => {
            const rawDate = metadata.frontMatter.date;
            const hasTimezone = typeof rawDate === 'string' && /(?:Z|[+-]\d{2}:?\d{2})$/i.test(rawDate);
            // Historical dates without an offset denote the original local publication day.
            const localDate =
                typeof rawDate === 'string' && !hasTimezone
                    ? rawDate.slice(0, 10)
                    : shanghaiDate.format(new Date(metadata.date));
            const [year, month, day] = localDate.split('-').map(Number);
            const tags = metadata.frontMatter.tags ?? [];
            const tagKeys = tags.map((tag) => (typeof tag === 'string' ? tag : tag.label));
            return {
                title: metadata.title,
                permalink: metadata.permalink,
                tagPermalinks: metadata.tags.map((tag) => tag.permalink),
                date: new Date(metadata.date).toISOString(),
                year,
                month,
                day,
                series: tagKeys.includes('mise') ? 'mise' : tagKeys.includes('zhibi') ? 'zhibi' : 'other',
            };
        })
        .sort(
            (a, b) =>
                a.year - b.year ||
                a.month - b.month ||
                a.day - b.day ||
                a.date.localeCompare(b.date) ||
                a.permalink.localeCompare(b.permalink),
        );
    return { articles };
}

export default function articleCalendarPlugin(): Plugin {
    return {
        name: 'article-calendar',
        allContentLoaded({ allContent, actions }) {
            const blog = allContent['docusaurus-plugin-content-blog']?.default as { blogPosts: BlogPost[] } | undefined;
            actions.setGlobalData(buildArticleCalendar(blog?.blogPosts ?? []));
        },
    };
}
