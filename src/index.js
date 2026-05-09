import parse from './parser.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const tree = buildDiff(obj1, obj2);

  const formatter = getFormatter(formatName);

  return formatter(tree);
};

export default genDiff;
