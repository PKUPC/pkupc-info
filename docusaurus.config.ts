import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const githubPageMode = process.env.GITHUB_PAGE_MODE?.toUpperCase() === 'TRUE';

const config: Config = {
    title: 'Puzzle and Key Universe 资料站',
    tagline: '一起来享受解谜的乐趣吧！',
    favicon: 'img/favicon.ico',

    url: 'https://info.pkupuzzle.art/',

    baseUrl: githubPageMode ? '/pnku-info/' : '/',

    organizationName: 'P&KU Team',
    projectName: 'P&KU Info',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    path: 'docs',
                    routeBasePath: 'docs',
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/kinami0331/pnku-info/blob/main/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/kinami0331/pnku-info/blob/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'P&KU 资料站',
            logo: {
                alt: 'P&KU Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'archive',
                    position: 'left',
                    label: '活动资料',
                },
                { to: '/blog', label: '文章', position: 'left' },
                {
                    href: 'https://github.com/kinami0331/pnku-info',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: '资料',
                    items: [
                        {
                            label: '活动资料',
                            to: '/docs/intro',
                        },
                        {
                            label: '文章',
                            to: '/blog',
                        },
                    ],
                },
                {
                    title: '联系方式',
                    items: [
                        {
                            label: 'QQ 群',
                            href: 'https://qm.qq.com/q/po0I9P148S',
                        },
                        {
                            label: '电子邮件',
                            href: 'mailto:winfridx@163.com',
                        },
                    ],
                },
                {
                    title: '往期活动',
                    items: [
                        {
                            label: 'P&KU 1 存档站',
                            href: 'https://pnku1.pkupuzzle.art/',
                        },
                        {
                            label: 'P&KU 2 存档站',
                            href: 'https://pnku2.pkupuzzle.art/',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} P&KU TEAM. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
