const indentSize = 4;

const makeIndent = (depth, type = 'space') => {
  const base = ' '.repeat(depth * indentSize - 2);
  if (type === 'added') return base + '+ ';
  if (type === 'removed') return base + '- ';
  return ' '.repeat(depth * indentSize);
};

const makeBracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize);

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value);
    const lines = entries.map(
      ([key, val]) => `${' '.repeat((depth + 1) * indentSize)}${key}: ${stringify(val, depth + 1)}`
    );
    return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
  }
  return String(value);
};

const stylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    const { key, type } = node;

    switch (type) {
      case 'nested':
        return `${' '.repeat(depth * indentSize)}${key}: ${stylish(node.children, depth + 1)}`;
      case 'added':
        return `${makeIndent(depth, 'added')}${key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${makeIndent(depth, 'removed')}${key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${makeIndent(depth, 'removed')}${key}: ${stringify(node.oldValue, depth)}`,
          `${makeIndent(depth, 'added')}${key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${' '.repeat(depth * indentSize)}${key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
};

export default stylish;
