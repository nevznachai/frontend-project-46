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

export default buildDiff;
