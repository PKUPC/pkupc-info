import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useLocation, useHistory } from '@docusaurus/router';
import { LeftOutlined, RightOutlined, TagOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import type { ArticleCalendarData, CalendarArticle } from './types';
import styles from './styles.module.css';

export const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
];
const normalizePath = (path: string) => path.replace(/\/$/, '');
const monthKey = (article: CalendarArticle) => `${article.year}-${article.month}`;

export function useCalendarArticles() {
    return (usePluginData('article-calendar') as ArticleCalendarData).articles;
}

export function useCurrentCalendarArticle() {
    const articles = useCalendarArticles();
    const { pathname } = useLocation();
    return articles.find((article) => normalizePath(article.permalink) === normalizePath(pathname));
}

function DateControl({
    label,
    previous,
    next,
    onPrevious,
    onNext,
    unit,
}: {
    label: string;
    previous: boolean;
    next: boolean;
    onPrevious: () => void;
    onNext: () => void;
    unit: '年' | '个有文章的月份';
}) {
    return (
        <div className={styles.control}>
            <button type="button" aria-label={`上一${unit}`} disabled={!previous} onClick={onPrevious}>
                <LeftOutlined />
            </button>
            <span className={styles.period} aria-live="polite" aria-atomic="true">
                {label}
            </span>
            <button type="button" aria-label={`下一${unit}`} disabled={!next} onClick={onNext}>
                <RightOutlined />
            </button>
        </div>
    );
}

export function MonthCard({
    year,
    month,
    articles,
    currentPermalink,
    heading = true,
}: {
    year: number;
    month: number;
    articles: CalendarArticle[];
    currentPermalink?: string;
    heading?: boolean;
}) {
    return (
        <section className={styles.month} aria-label={`${year}年${monthNames[month - 1]}`}>
            {heading && (
                <Heading as="h2" className={styles.monthTitle}>
                    {monthNames[month - 1]}
                </Heading>
            )}
            {articles.length ? (
                <ul className={styles.articles}>
                    {articles.map((article) => (
                        <li key={article.permalink}>
                            <Link
                                to={article.permalink}
                                className={clsx(styles.article, styles[article.series], {
                                    [styles.active]: currentPermalink === article.permalink,
                                })}
                                title={article.title}
                                aria-label={`${article.year}年${article.month}月${article.day}日 ${article.title}`}
                                aria-current={currentPermalink === article.permalink ? 'page' : undefined}
                            >
                                <time
                                    className={styles.day}
                                    dateTime={`${article.year}-${String(article.month).padStart(2, '0')}-${String(article.day).padStart(2, '0')}`}
                                >
                                    {article.day}
                                </time>
                                <span className={styles.articleTitle}>
                                    {article.title.replace(/^【(?:谜色星期五|谜色星期三|黑色星期五|执笔成谜)】\s*/, '')}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>本月暂无文章</p>
            )}
        </section>
    );
}

export function CalendarHome() {
    return <ArticleCalendar articles={useCalendarArticles()} title="公众号文章" />;
}

export function ArticleCalendar({
    articles,
    title,
    description,
    allTagsPath,
}: {
    articles: CalendarArticle[];
    title: string;
    description?: string;
    allTagsPath?: string;
}) {
    const location = useLocation();
    const history = useHistory();
    const isBrowser = useIsBrowser();
    const years = articles.map((article) => article.year);
    const latest = years.length ? Math.max(...years) : new Date().getUTCFullYear();
    const earliest = years.length ? Math.min(...years) : latest;
    // Static HTML has no query string; match it during the first hydration render.
    const requested = isBrowser ? Number(new URLSearchParams(location.search).get('year')) : latest;
    const year = Number.isInteger(requested) && requested >= earliest && requested <= latest ? requested : latest;
    const changeYear = (value: number) => {
        const params = new URLSearchParams(location.search);
        params.set('year', String(value));
        history.push({ pathname: location.pathname, search: params.toString(), hash: location.hash });
    };
    return (
        <main className={clsx('container margin-vert--lg', styles.calendar)}>
            {allTagsPath ? (
                <header className={styles.tagHeader}>
                    <span className={styles.tagBadge}>
                        <TagOutlined aria-hidden="true" /> 标签
                    </span>
                    <Heading as="h1">{title}</Heading>
                    {description && <p className={styles.tagDescription}>{description}</p>}
                    <div className={styles.tagMeta}>
                        <span>共 {articles.length} 篇文章</span>
                        <Link to={allTagsPath}>
                            查看所有标签 <RightOutlined aria-hidden="true" />
                        </Link>
                    </div>
                </header>
            ) : (
                <Heading as="h1">{title}</Heading>
            )}
            <DateControl
                label={`${year}年`}
                previous={year > earliest}
                next={year < latest}
                onPrevious={() => changeYear(year - 1)}
                onNext={() => changeYear(year + 1)}
                unit="年"
            />
            <div className={styles.legend} aria-label="栏目颜色说明">
                <span>
                    <i className={styles.mise} aria-hidden="true" />
                    谜色／黑色星期五
                </span>
                <span>
                    <i className={styles.zhibi} aria-hidden="true" />
                    执笔成谜
                </span>
            </div>
            <div className={styles.grid}>
                {monthNames.map((name, index) => (
                    <MonthCard
                        key={`${year}-${name}`}
                        year={year}
                        month={index + 1}
                        articles={articles.filter((article) => article.year === year && article.month === index + 1)}
                    />
                ))}
            </div>
        </main>
    );
}

export function ArticleMonthNavigation({ current, mobile = false }: { current: CalendarArticle; mobile?: boolean }) {
    const articles = useCalendarArticles();
    const months = Array.from(new Map(articles.map((article) => [monthKey(article), article])).values());
    const [selected, setSelected] = useState(monthKey(current));
    const index = months.findIndex((article) => monthKey(article) === selected);
    const month = months[index] ?? current;
    const calendarUrl = useBaseUrl('/wechat-official-account');
    return (
        <nav className={clsx(styles.monthNavigation, { [styles.sticky]: !mobile })} aria-label="当月文章导航">
            {mobile ? (
                <Heading as="h2" className={styles.mobileTitle}>
                    {current.year}年{monthNames[current.month - 1]}
                </Heading>
            ) : (
                <DateControl
                    label={`${month.year}年${monthNames[month.month - 1]}`}
                    previous={index > 0}
                    next={index >= 0 && index < months.length - 1}
                    onPrevious={() => setSelected(monthKey(months[index - 1]))}
                    onNext={() => setSelected(monthKey(months[index + 1]))}
                    unit="个有文章的月份"
                />
            )}
            <MonthCard
                year={month.year}
                month={month.month}
                heading={false}
                articles={articles.filter((article) => monthKey(article) === monthKey(month))}
                currentPermalink={current.permalink}
            />
            <Link className={styles.returnLink} to={`${calendarUrl}?year=${month.year}`}>
                返回文章日历
            </Link>
        </nav>
    );
}
