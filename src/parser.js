import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  const extname = path.extname(filepath);

  if (extname === '.json') {
    return JSON.parse(data);
  } else if (extname === '.yml' || extname === '.yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${extname}`);
};

export default parse;
