import React, { CSSProperties, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const AnswerBlock = ({ children }: { children: React.ReactNode }) => {
    const { colorMode } = useColorMode();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const isDarkTheme = colorMode === 'dark';
    const defaultStyle = {
        textTransform: 'uppercase',
        color: isDarkTheme ? 'white' : 'black',
        backgroundColor: isDarkTheme ? 'white' : 'black',
        padding: '5px',
    } as CSSProperties;
    const hoverStyle = {
        ...defaultStyle,
        color: isDarkTheme ? 'black' : 'white',
        backgroundColor: isDarkTheme ? 'white' : 'black',
    };

    const currentStyle = isHovered ? hoverStyle : defaultStyle;

    return (
        <span style={currentStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
        </span>
    );
};

export default AnswerBlock;
