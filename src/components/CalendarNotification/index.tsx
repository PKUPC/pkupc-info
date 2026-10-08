import React from 'react';
import Link from '@docusaurus/Link';
import { NotificationFilled } from '@ant-design/icons';
import styles from './styles.module.css';

export default function CalendarNotification({ mobile = false }: { mobile?: boolean }): React.ReactNode {
    if (mobile) return null;

    return (
        <Link className={`navbar__item ${styles.link}`} to="/curated/2027-puzzle-calendar">
            <NotificationFilled aria-hidden="true" />
            <span>2027 谜题日历已经推出！</span>
        </Link>
    );
}
