import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '_fixtures_', filename);

const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat json diff', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const expected = readFile('expected.txt');

  expect(genDiff(file1, file2)).toBe(expected);
});
