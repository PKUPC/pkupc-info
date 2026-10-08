import React from 'react';
import CalendarAnnouncement from '@site/src/components/CalendarAnnouncement';

export default function Root({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <>
            {children}
            <CalendarAnnouncement />
        </>
    );
}
