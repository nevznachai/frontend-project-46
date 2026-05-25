const spacesCount = 4;

const getIndent = (depth) => ' '.repeat(depth * spacesCount);

const getSignIndent = (depth, sign) =>
  ' '.repeat(depth * spacesCount - 2) + `${sign} `;

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const indent = ' '.repeat(depth * spacesCount);
    const bracketIndent = ' '.repeat((depth - 1) * spacesCount);

    const lines = Object.entries(value).map(
      ([key, val]) =>
        `${indent}    ${key}: ${stringify(val, depth + 1)}`
    );

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }

  return String(value);
};



const stylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${getSignIndent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`;

      case 'removed':
        return `${getSignIndent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`;

      case 'unchanged':
        return `${getIndent(depth)}${node.key}: ${stringify(node.value, depth)}`;

      case 'changed':
        return [
          `${getSignIndent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth)}`,
          `${getSignIndent(depth, '+')}${node.key}: ${stringify(node.newValue, depth)}`,
        ];

      case 'nested':
         return `${getIndent(depth)}${node.key}: ${stylish(node.children, depth + 1)}`;


     default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return [
    '{',
    ...lines,
    `${getIndent(depth - 1)}}`,
  ].join('\n');
};

export default stylish;
