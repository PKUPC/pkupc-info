import React from 'react';
import Details from '@theme/Details';
import Heading from '@theme/Heading';

const Solutions = ({ children, author }: { children: React.ReactNode; author?: string }) => {
    return (
        <>
            <Heading as="h2">解析与评价{author ? `（作者：${author}）` : null}</Heading>
            <Details summary={'查看解析'}>{children}</Details>
        </>
    );
};

export default Solutions;
