import React from 'react';
import Details from '@theme/Details';

const Solutions = ({ children, author }: { children: React.ReactNode; author?: string }) => {
    return <Details summary={`解析与评价${author ? '（作者：' + author + '）' : ''}`}>{children}</Details>;
};

export default Solutions;
