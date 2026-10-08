import React from 'react';
import { WechatOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import styles from './styles.module.css';

type Props = {
    href: string;
    solutionHref?: string;
};

export default function WechatArticleLink({ href, solutionHref }: Props): React.ReactNode {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#07a344' } }}>
            <div className={styles.links}>
                <Button type="primary" icon={<WechatOutlined />} href={href} target="_blank" rel="noopener noreferrer">
                    查看微信公众号原文
                </Button>
                {solutionHref && (
                    <Button
                        type="primary"
                        icon={<WechatOutlined />}
                        href={solutionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        查看原文解析
                    </Button>
                )}
            </div>
        </ConfigProvider>
    );
}
