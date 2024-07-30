import React from 'react';
import styles from './WinfridWords.module.css';

type WinfridWordsType = {
    children: React.ReactNode;
};

export default function WinfridWords({ children }: WinfridWordsType) {
    return <div className={styles.winfridWords}>{children}</div>;
}
