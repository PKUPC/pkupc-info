/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import Admonition from '@theme/Admonition';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { normalizeAnswerString } from '../utils/formatString';
import { Button, Form, FormProps, Space, Tag, Tooltip } from 'antd';
import { Input } from 'antd/lib';
import Heading from '@theme/Heading';

export interface AnswerCheckProps {
    answer?: string | Record<string, Answer>;
    specialJudge?: AnswerSpecialJudge;
    showHistory?: boolean;
}

export enum AnswerType {
    CORRECT = 'CORRECT',
    MILESTONE = 'MILESTONE',
    WRONG = 'WRONG',
    INIT = 'INIT',
}

export type Answer = {
    type: AnswerType;
    message?: string;
};

export type AnswerSpecialJudgeParam = {
    currentAnswer: string;
    pastAnswers?: string[];
};
export type AnswerSpecialJudge = (param: AnswerSpecialJudgeParam) => Answer;

const regularJudge = (x: string, ansMap: Record<string, Answer>): Answer => {
    const normalizedX = normalizeAnswerString(x);
    return (
        ansMap[normalizedX] || {
            type: AnswerType.WRONG,
        }
    );
};

type AdmonitionDisplayProps = {
    type: string;
    icon: React.ReactNode;
    genDefaultText: (x: string) => React.ReactNode;
};

const statusAdmonitionTypeMap: Record<AnswerType, AdmonitionDisplayProps> = {
    [AnswerType.CORRECT]: {
        type: 'tip',
        icon: <CheckCircleOutlined />,
        genDefaultText: (x) => `回答正确！这道谜题的正确答案是“${x}”。`,
    },
    [AnswerType.MILESTONE]: {
        type: 'warning',
        icon: <ExclamationCircleOutlined />,
        genDefaultText: (x) => `“${x}”是这道谜题的中间结果！`,
    },
    [AnswerType.WRONG]: {
        type: 'danger',
        icon: <CloseCircleOutlined />,
        genDefaultText: (_) => `回答错误！你没有得到任何信息！`,
    },
    [AnswerType.INIT]: {
        type: 'info',
        icon: <QuestionCircleOutlined />,
        genDefaultText: (_) => `输入答案以验证`,
    },
};

const statusTagColorMap: Record<AnswerType, string> = {
    [AnswerType.CORRECT]: 'success',
    [AnswerType.MILESTONE]: 'warning',
    [AnswerType.WRONG]: 'error',
    [AnswerType.INIT]: 'processing',
};

type AnswerResultType = {
    answer: string;
    verdict: AnswerType;
    message?: string;
};

const AnswerHistory = ({ historyAnswers }: { historyAnswers: AnswerResultType[] }) => (
    <div>
        <Heading as={'h3'}>历史提交</Heading>
        <div className="p-[16px] rounded-[8px] w-full answer-history-container">
            <Space direction="horizontal">
                {historyAnswers.map((history) => (
                    <Tooltip key={`answer-tag-${history.answer}`} title={history.message ? history.message : null}>
                        <Tag color={statusTagColorMap[history.verdict]}>{history.answer}</Tag>
                    </Tooltip>
                ))}
            </Space>
        </div>
    </div>
);

type AnswerFormFieldType = {
    answer?: string;
};

export const AnswerCheck = ({ answer, specialJudge, showHistory = true }: AnswerCheckProps) => {
    const [status, setStatus] = useState<AnswerType>(AnswerType.INIT);
    const [lastAnswer, setLastAnswer] = useState<string>('');
    const [lastMessage, setLastMessage] = useState<string | undefined>();
    const [historyAnswers, setHistoryAnswers] = useState<AnswerResultType[]>([]);

    const answerMap: Record<string, Answer> | undefined = useMemo(() => {
        if (!answer) return undefined;
        const newAnsMap: Record<string, Answer> = {};
        if (typeof answer === 'string') {
            newAnsMap[normalizeAnswerString(answer)] = {
                type: AnswerType.CORRECT,
            };
        } else {
            for (const key in answer) {
                const normalizedKey = normalizeAnswerString(key);
                newAnsMap[normalizedKey] = answer[key];
            }
        }

        return newAnsMap;
    }, [answer]);

    const { type: admonitionType, icon, genDefaultText } = statusAdmonitionTypeMap[status];

    const onCheckAnswer: FormProps<AnswerFormFieldType>['onFinish'] = (values) => {
        const { answer } = values;
        const normalizedAnswer = normalizeAnswerString(answer);
        setLastAnswer(normalizedAnswer);
        const history = historyAnswers.find((history) => history.answer === normalizedAnswer);
        if (history) {
            const { verdict, message } = history;
            setStatus(verdict);
            setLastMessage(message);
            return;
        }
        try {
            const result = specialJudge
                ? specialJudge({
                      currentAnswer: normalizedAnswer,
                      pastAnswers: historyAnswers.map((record) => record.answer),
                  })
                : regularJudge(normalizedAnswer, answerMap);
            setStatus(result.type);
            setLastMessage(result.message);
            setHistoryAnswers((hisAnswers) =>
                hisAnswers.concat([
                    {
                        answer: normalizedAnswer,
                        verdict: result.type,
                        message: result.message,
                    },
                ]),
            );
        } catch (err) {
            setStatus(AnswerType.WRONG);
            setLastMessage('验证器错误，请联系网站管理员！');
        }
        console.log('cx', historyAnswers);
    };

    const isShowHistory = showHistory && historyAnswers.length > 0;

    return (
        <Admonition type={admonitionType} icon={icon} title={lastMessage || genDefaultText(lastAnswer)}>
            <Space direction="vertical" className="mt-[24px] w-full">
                <Form onFinish={onCheckAnswer}>
                    <Space.Compact block className="w-full">
                        <Form.Item<AnswerFormFieldType> name="answer" className="w-full lg:w-2/3">
                            <Input
                                placeholder={'请输入答案'}
                                className="ant-input-compact-item ant-input-compact-first-item"
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Space.Compact>
                </Form>
                {isShowHistory && <AnswerHistory historyAnswers={historyAnswers} />}
            </Space>
        </Admonition>
    );
};
