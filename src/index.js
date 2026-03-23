import fs from 'fs';
import path from 'path';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content);
};

const formatValue = (value) => {
  if (typeof value === 'boolean' || value === null) {
    return String(value);
  }
  return value;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys = Array.from(
    new Set([...Object.keys(data1), ...Object.keys(data2)])
  ).sort();

  const lines = keys.flatMap((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (key in data1 && key in data2) {
      if (val1 === val2) {
        return `    ${key}: ${formatValue(val1)}`;
      }

      return [
        `  - ${key}: ${formatValue(val1)}`,
        `  + ${key}: ${formatValue(val2)}`,
      ];
    }

    if (key in data1) {
      return `  - ${key}: ${formatValue(val1)}`;
    }

    return `  + ${key}: ${formatValue(val2)}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
