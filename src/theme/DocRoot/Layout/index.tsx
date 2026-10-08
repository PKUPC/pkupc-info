import React from 'react';
import DocRootLayout from '@theme-original/DocRoot/Layout';
import type DocRootLayoutType from '@theme/DocRoot/Layout';
import type { WrapperProps } from '@docusaurus/types';
import styles from './styles.module.css';

export default function DocRootLayoutWrapper(props: WrapperProps<typeof DocRootLayoutType>): React.ReactNode {
    return (
        <div className={styles.frame}>
            <DocRootLayout {...props} />
        </div>
    );
}
