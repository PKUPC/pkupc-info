import React from 'react';

const ImgCaption = ({ children }: { children: React.ReactNode }) => {
    return <div className={'text-gray-500 mt-1 mb-4'}>{children}</div>;
};

export default ImgCaption;
