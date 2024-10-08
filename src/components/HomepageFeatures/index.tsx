import clsx from 'clsx';
import Heading from '@theme/Heading';
import React from 'react';

type FeatureItem = {
    title: string;
    description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: '关于我们',
        description: <>PKU Puzzle Club 是北京大学学生自主运营的由谜题爱好者组成的社团（筹备中）。</>,
    },
    {
        title: '关于 P&KU',
        description: <>Puzzle and Key Universe (P&KU) 是 Puzzle Hunt 的一种。</>,
    },
];

function Feature({ title, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className="flex items-center pt-8 pb-8 w-full">
            <div className="container">
                <div className="row">
                    <div className={clsx('col col--2')}></div>
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
