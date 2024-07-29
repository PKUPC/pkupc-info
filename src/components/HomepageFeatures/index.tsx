import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import mountainSvg from '@site/static/img/undraw_docusaurus_mountain.svg';
import treeSvg from '@site/static/img/undraw_docusaurus_tree.svg';
import reactSvg from '@site/static/img/undraw_docusaurus_react.svg';
import React from 'react';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: '这是什么活动？',
        Svg: mountainSvg,
        description: <>Puzzle and Key Universe (P&KU) 是 Puzzle Hunt 的一种。</>,
    },
    {
        title: '活动由谁组织？',
        Svg: treeSvg,
        description: (
            <>
                P&KU 系列的主要策划者是现在在北京大学（PKU）就读的 Winfrid。截至
                P&KU3，每届的编写团队与工作人员都包含了很多在北京大学就读的同学及校友，同时也有来自校外的朋友们。
                你可以在活动资料中查看每一届的工作人员列表。
            </>
        ),
    },
    {
        title: '什么时间举办？',
        Svg: reactSvg,
        description: <>目前本活动大约一年一次，具体的时间和日期并不确定。等 Winfrid 来补充。</>,
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            {/*<div className="text--center">*/}
            {/*    <Svg className={styles.featureSvg} role="img" />*/}
            {/*</div>*/}
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
