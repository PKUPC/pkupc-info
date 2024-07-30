import { visit } from 'unist-util-visit';

function makeAttribute(name: string, value: string | number | undefined) {
    return {
        type: 'mdxJsxAttribute',
        name: name,
        value: {
            type: 'mdxJsxAttributeValueExpression',
            value: value,
            data: {
                estree: {
                    sourceType: 'module',
                    comments: [],
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression:
                                value === undefined
                                    ? {
                                          type: 'Identifier',
                                          name: 'undefined',
                                      }
                                    : typeof value === 'number'
                                      ? {
                                            type: 'Literal',
                                            value: value,
                                            raw: value.toString(),
                                        }
                                      : {
                                            type: 'Literal',
                                            value: value,
                                            raw: JSON.stringify(value),
                                        },
                        },
                    ],
                },
            },
        },
    };
}

const customImage = () => {
    return (tree) => {
        visit(tree, (node, _, parent) => {
            if (node.type === 'mdxJsxTextElement' && node.name === 'img') {
                const filteredAttrs = node.attributes.filter((item) => item.name === 'src');
                if (filteredAttrs.length != 1) return; // 神秘情况
                const srcAttr = filteredAttrs[0];

                const lastExclamationIndex = srcAttr.value.value.lastIndexOf('!');
                let filePath = srcAttr.value.value.substring(lastExclamationIndex + 1);
                const defaultIndex = filePath.lastIndexOf('").default');
                if (defaultIndex !== -1) filePath = filePath.substring(0, defaultIndex);

                const matchWidth = filePath.match(/[?&]width=(\d+)/);
                const width = matchWidth ? matchWidth[1] : undefined;
                node.type = 'mdxJsxTextElement';
                node.name = 'CustomImage';
                node.data = { _mdxExplicitJsx: true };
                node.attributes = [srcAttr, makeAttribute('width', parseInt(width))];

                if (parent && parent.tagName === 'p' && parent.children.length === 1) {
                    Object.keys(parent).forEach((key) => delete parent[key]);
                    Object.keys(node).forEach((key) => (parent[key] = node[key]));
                }
            }
            if (node.type === 'element' && node.tagName === 'img') {
                node.type = 'mdxJsxTextElement';
                node.name = 'CustomImage';
                node.data = { _mdxExplicitJsx: true };
                const matchWidth = node.properties.src.match(/[?&]width=(\d+)/);
                const width = matchWidth ? matchWidth[1] : undefined;
                node.attributes = [makeAttribute('src', node.properties.src), makeAttribute('width', parseInt(width))];

                if (parent && parent.tagName === 'p' && parent.children.length === 1) {
                    Object.keys(parent).forEach((key) => delete parent[key]);
                    Object.keys(node).forEach((key) => (parent[key] = node[key]));
                }
            }
            // if (node.type === 'mdxJsxFlowElement' && node.name === 'CustomImage') {
            //     console.log(node);
            //     console.log(JSON.stringify(node.attributes[0].value, null, 2));
            //     console.log(JSON.stringify(node.attributes[1].value, null, 2));
            // }
        });
    };
};

export default customImage;
