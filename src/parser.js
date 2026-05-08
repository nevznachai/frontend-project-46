import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  const extname = path.extname(filepath);

  switch (extname) {
    case '.json':
      return JSON.parse(data);

    case '.yml':
    case '.yaml':
      return yaml.load(data);

    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};

export default parse;
