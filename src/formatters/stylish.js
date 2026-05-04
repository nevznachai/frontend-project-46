const indent = (depth) => '  '.repeat(depth * 2);

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => `${indent(depth + 1)}${k}: ${stringify(v, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${indent(depth)}}`;
  }
  return String(value);
};

const stylish = (tree, depth = 0) => {
  const lines = tree.map((node) => {
    const { key, type } = node;
    switch (type) {
      case 'nested':
        return `${indent(depth)}  ${key}: ${stylish(node.children, depth + 1)}`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${indent(depth)}- ${key}: ${stringify(node.oldValue, depth)}\n${indent(depth)}+ ${key}: ${stringify(node.newValue, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

export default stylish;
