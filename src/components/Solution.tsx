import React from 'react';
import Details from '@theme/Details';

const Solutions = ({ children, author }: { children: React.ReactNode; author?: string }) => {
    return <Details summary={'查看解析' + author ? `（作者：${author}）` : null}>{children}</Details>;
};

export default Solutions;
