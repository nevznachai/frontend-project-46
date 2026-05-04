import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (formatName = 'stylish') => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatters[formatName];
};
