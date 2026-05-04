import stylish from './stylish.js';

const formatters = {
  stylish,
};

export default (diff, format = 'stylish') => {
  return formatters[format](diff);
};
