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
        description: (
            <>
                PKU Puzzle Club
                是由北京大学的谜题爱好者组成的社团。我们关注各种各样的解谜活动，包括各种在线解谜活动、纸笔谜题、解谜游戏等。
            </>
        ),
    },
    {
        title: '开放活动',
        description: (
            <>
                这里是一些由我们组织的公开活动，任何人都可以自由参与！
                <ul className="indent-2">
                    <li>P&KU：在线解谜活动，大约一年一度</li>
                    <li>谜色星期五：更新于公众号的日常谜题</li>
                    <li>
                        <del>每日纸笔：目前尚未公开更新，敬请期待</del>
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: '社团活动',
        description: (
            <>
                这里是在校内举办的或者筹备中的活动，如果您也是喜欢解谜的在校生（或者毕业生），欢迎加入我们！
                <ul className="indent-2">
                    <li>解谜作品研讨（吐槽、分享）会</li>
                    <li>线下纸笔谜题竞赛 PKUPC</li>
                    <li>校园寻宝、谜题工坊……</li>
                </ul>
            </>
        ),
    },
];

function Feature({ title, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="padding-horiz--md">
                <Heading as="h3" className="text-center">
                    {title}
                </Heading>
                <p className="indent-8">{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className="flex items-center pt-8 pb-8 w-full">
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
