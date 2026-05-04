const stringifyPlain = (value) => {
  if (value !== null && typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const formatPlain = (diffTree, parent = '') => {
  const lines = diffTree.flatMap((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key;

    switch (node.type) {
      case 'nested':
        return formatPlain(node.children, property);
      case 'added':
        return `Property '${property}' was added with value: ${stringifyPlain(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
