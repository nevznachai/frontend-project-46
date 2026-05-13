const makeIndent = (depth) => '    '.repeat(depth);
const makeBracketIndent = (depth) => '    '.repeat(depth - 1);
const makeSignIndent = (depth) => `${makeBracketIndent(depth)}  `;

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const lines = Object.entries(value)
      .map(([key, val]) => (
        `${makeSignIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`
      ));

    return [
      '{',
      ...lines,
      `${makeBracketIndent(depth)}}`,
    ].join('\n');
  }

  return String(value);
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const { key, type } = node;

    switch (type) {
      case 'nested':
        return `${makeSignIndent(depth)}  ${key}: ${stylish(node.children, depth + 1)}`;

      case 'added':
        return `${makeSignIndent(depth)}+ ${key}: ${stringify(node.value, depth + 1)}`;

      case 'removed':
        return `${makeSignIndent(depth)}- ${key}: ${stringify(node.value, depth + 1)}`;

      case 'changed':
        return [
          `${makeSignIndent(depth)}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
          `${makeSignIndent(depth)}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');

      case 'unchanged':
        return `${makeSignIndent(depth)}  ${key}: ${stringify(node.value, depth + 1)}`;

      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return [
    '{',
    ...lines,
    `${makeBracketIndent(depth)}}`,
  ].join('\n');
};

export default stylish;
