const buildDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  return keys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!(key in obj1)) return { key, type: 'added', value: val2 };
    if (!(key in obj2)) return { key, type: 'removed', value: val1 };

    if (val1 !== null && typeof val1 === 'object' &&
        val2 !== null && typeof val2 === 'object') {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    if (val1 !== val2) return { key, type: 'changed', oldValue: val1, newValue: val2 };

    return { key, type: 'unchanged', value: val1 };
  });
};

const indent = (depth) => '  '.repeat(depth * 2);

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => `${indent(depth + 1)}${k}: ${stringify(v, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${indent(depth)}}`;
  }
  return value === null ? 'null' : String(value);
};

const formatStylish = (tree, depth = 0) => {
  return `{\n${tree.map((node) => {
    const { key, type } = node;

    switch (type) {
      case 'nested':
        return `${indent(depth)}  ${key}: ${formatStylish(node.children, depth + 1)}`;
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
  }).join('\n')}\n${indent(depth)}}`;
};

const genDiff = (obj1, obj2, format = 'stylish') => {
  const tree = buildDiff(obj1, obj2);
  return formatStylish(tree);
};

export default genDiff;
