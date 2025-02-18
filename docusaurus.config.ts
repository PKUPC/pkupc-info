import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dotenv from 'dotenv';
import customImage from './src/plugins/customImage';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const githubPageMode = process.env.GITHUB_PAGE_MODE?.toUpperCase() === 'TRUE';
const beiAnInfo =
    process.env.BEI_AN_MODE?.toUpperCase() === 'TRUE'
        ? '<br/><a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer noopener">京ICP备2022031972号-1</a>'
        : '';

const config: Config = {
    title: 'PKU Puzzle Club',
    tagline: '一起来享受解谜的乐趣吧！',
    favicon: 'img/favicon.ico',

    url: 'https://info.pkupuzzle.art/',

    baseUrl: githubPageMode ? '/pkupc-info/' : '/',

    organizationName: 'PKU Puzzle Club',
    projectName: 'pkupc-info',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    markdown: {
        format: 'detect',
    },

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
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/PKUPC/pkupc-info/blob/main/',
                    rehypePlugins: [customImage],
                },
                blog: {
                    showReadingTime: true,
                    routeBasePath: 'wechat-official-account',
                    path: 'content/wechat-official-account',
                    editUrl: 'https://github.com/PKUPC/pkupc-info/blob/main/',
                    blogSidebarTitle: 'All posts',
                    blogSidebarCount: 'ALL',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/info-thumb-image.jpg',
        navbar: {
            title: 'PKU Puzzle Club',
            logo: {
                alt: 'P&KU Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'archive',
                    position: 'left',
                    label: 'P&KU',
                },
                // {
                //     type: 'docSidebar',
                //     sidebarId: 'tools',
                //     position: 'left',
                //     label: '常用工具',
                // },
                { to: '/wechat-official-account', label: '公众号文章', position: 'left' },
                {
                    href: 'https://github.com/PKUPC/pkupc-info',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: '内容',
                    items: [
                        {
                            label: '活动资料',
                            to: '/archive/about',
                        },
                        {
                            label: '公众号文章',
                            to: '/wechat-official-account',
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
                        {
                            label: '微信公众号',
                            href: 'https://info.pkupuzzle.art/img/qrcode.webp',
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
                        {
                            label: 'P&KU 3 存档站',
                            href: 'https://pnku3.pkupuzzle.art/',
                        },
                        {
                            label: 'P&KU 3 开放游玩环境',
                            href: 'https://pnku3-playground.pkupuzzle.art/',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} P&KU TEAM. Built with Docusaurus.${beiAnInfo}`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,

    plugins: [
        async function tailwindPlugin() {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    postcssOptions.plugins.push(tailwindcss);
                    postcssOptions.plugins.push(autoprefixer);
                    return postcssOptions;
                },
            };
        },
    ],
};

export default config;
