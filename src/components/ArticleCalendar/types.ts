export type ArticleSeries = 'mise' | 'zhibi' | 'other';

export interface CalendarArticle {
    title: string;
    permalink: string;
    date: string;
    year: number;
    month: number;
    day: number;
    series: ArticleSeries;
    tagPermalinks: string[];
}

export interface ArticleCalendarData {
    articles: CalendarArticle[];
}
