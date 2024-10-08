/** @type {import('tailwindcss').Config} */
// see https://dev.to/shannonajclarke/using-tailwindcss-v3-in-docusaurus-in-5-steps-5c26
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}', './docs/**/*.{md,mdx}', './blog/**/*.{md,mdx}'],
    theme: {
        extend: {
            screens: {
                w996: '996px',
            },
        },
    },
    plugins: [],
    darkMode: ['class', '[data-theme="dark"]'],
    corePlugins: {
        preflight: false,
    },
    blocklist: ['container'],
};
