import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import type MDXContentType from '@theme/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyleProvider } from '@ant-design/cssinjs';

type Props = WrapperProps<typeof MDXContentType>;

export default function MDXContentWrapper(props: Props): React.ReactNode {
    return (
        <ConfigProvider locale={zhCN} theme={{ cssVar: true }}>
            <StyleProvider hashPriority={'high'}>
                <MDXContent {...props} />
            </StyleProvider>
        </ConfigProvider>
    );
}
