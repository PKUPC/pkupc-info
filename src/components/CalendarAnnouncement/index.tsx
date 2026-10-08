import React, { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { BorderBeam, ConfigProvider, Modal, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyleProvider } from '@ant-design/cssinjs';
import styles from './styles.module.css';

const STORAGE_KEY = 'pkupc-info:calendar-2027:dismissed';
const CALENDAR_URL = '/curated/2027-puzzle-calendar';
const BEAM_COLORS = ['#f3cf6f', '#c75741', '#78b273', '#e79454', '#1d1d1d', '#7fc6ec'].map((color, index) => ({
    color,
    percent: index * 20,
}));

export default function CalendarAnnouncement(): React.ReactNode {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const imageUrl = useBaseUrl('/img/puzzle-calendar-2027.png');

    useEffect(() => {
        try {
            setOpen(localStorage.getItem(STORAGE_KEY) !== 'true');
        } catch {
            // Storage may be unavailable; the announcement can still be dismissed for this visit.
            setOpen(true);
        }

        // Root is outside Docusaurus's color-mode provider, so follow its HTML theme attribute.
        const updateTheme = () => setDark(document.documentElement.getAttribute('data-theme') === 'dark');
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const dismiss = () => {
        setOpen(false);
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
            // Keep the modal closed even if the browser cannot persist this preference.
        }
    };

    return (
        <ConfigProvider
            locale={zhCN}
            theme={{ cssVar: {}, algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
        >
            <StyleProvider hashPriority="high">
                <Modal
                    title="2027谜题日历，现已推出"
                    open={open}
                    onCancel={dismiss}
                    footer={null}
                    centered
                    width={760}
                    className={styles.modal}
                    styles={{ body: { maxHeight: 'calc(100dvh - 160px)', overflowY: 'auto' } }}
                >
                    <p className={styles.note}>
                        <strong>北大谜协</strong>的社员，记得向客服出示你的社员卡，可以获得<strong>5元优惠券</strong>噢~
                    </p>
                    <BorderBeam color={BEAM_COLORS} count={2} lineWidth={3} size={280} duration={8} outset={0}>
                        <Link
                            className={styles.product}
                            to={CALENDAR_URL}
                            onClick={dismiss}
                            aria-label="查看2027谜题日历介绍"
                        >
                            <img
                                className={styles.image}
                                src={imageUrl}
                                alt="2027谜题日历，北京大学学生谜题协会荣誉出品"
                                width={1080}
                                height={810}
                            />
                        </Link>
                    </BorderBeam>
                </Modal>
            </StyleProvider>
        </ConfigProvider>
    );
}
