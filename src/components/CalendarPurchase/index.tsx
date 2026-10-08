import React, { useEffect, useRef, useState } from 'react';
import { Button, ConfigProvider, Modal, theme } from 'antd';
import { TaobaoOutlined } from '@ant-design/icons';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const DEEP_LINK = 'taobao://item.taobao.com/item.htm?id=1084309775341';
const FALLBACK_DELAY = 1800;

export default function CalendarPurchase({ imageSrc }: { imageSrc: string }): React.ReactNode {
    const { colorMode } = useColorMode();
    const [open, setOpen] = useState(false);
    const [launching, setLaunching] = useState(false);
    const cancelPending = useRef<(() => void) | null>(null);

    useEffect(() => () => cancelPending.current?.(), []);

    const purchase = () => {
        const mobile =
            /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (!mobile) {
            setOpen(true);
            return;
        }

        cancelPending.current?.();
        setLaunching(true);

        const cleanup = () => {
            window.clearTimeout(timer);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('pagehide', onPageHide);
            cancelPending.current = null;
        };
        const onPageHide = () => {
            cleanup();
            setLaunching(false);
        };
        const onVisibilityChange = () => {
            if (document.hidden) onPageHide();
        };
        const showFallback = () => {
            cleanup();
            setLaunching(false);
            if (!document.hidden) setOpen(true);
        };

        // Browsers don't report app-launch success. Leaving the page cancels the visible-page fallback.
        const timer = window.setTimeout(showFallback, FALLBACK_DELAY);
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pagehide', onPageHide);
        cancelPending.current = cleanup;
        try {
            window.location.assign(DEEP_LINK);
        } catch {
            showFallback();
        }
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: colorMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: { colorPrimary: '#ff5000' },
            }}
        >
            <div className={styles.action}>
                <Button type="primary" size="large" icon={<TaobaoOutlined />} onClick={purchase} loading={launching}>
                    购买2027谜题日历
                </Button>
            </div>
            <Modal
                title="购买2027谜题日历"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                centered
                width={440}
            >
                <img
                    className={styles.image}
                    src={imageSrc}
                    alt="2027纸笔谜题日历商品卡片：保存图片到相册，打开淘宝App扫码查看商品"
                />
            </Modal>
        </ConfigProvider>
    );
}
