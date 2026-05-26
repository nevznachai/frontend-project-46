const indentSize = 4;

const getIndent = (depth) => ' '.repeat(depth * indentSize);
const getSignIndent = (depth) => ' '.repeat(depth * indentSize - 2);

const stringify = (value, depth) => {
  if (value === null || typeof value !== 'object') {
    return String(value);
  }

  const indent = getIndent(depth);
  const bracketIndent = getIndent(depth - 1);

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
  const indent = getSignIndent(depth);

  const lines = tree.flatMap((item) => {
    switch (item.type) {
      case 'nested':
        return `${indent}  ${item.key}: ${formatStylish(item.children, depth + 1)}`;

      case 'added':
        return `${indent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;

      case 'removed':
        return `${indent}- ${item.key}: ${stringify(item.value, depth + 1)}`;

      case 'unchanged':
        return `${indent}  ${item.key}: ${stringify(item.value, depth + 1)}`;

      case 'changed':
        return [
          `${indent}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`,
          `${indent}+ ${item.key}: ${stringify(item.newValue, depth + 1)}`,
        ];

      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  });

  const bracketIndent = getIndent(depth - 1);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatStylish;
