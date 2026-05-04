import fs from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/index.js';

test('gendiff stylish JSON', () => {
  const file1 = parse(path.resolve(__dirname, 'fixtures/file1.json'));
  const file2 = parse(path.resolve(__dirname, 'fixtures/file2.json'));

  const diff = genDiff(file1, file2, 'stylish');

  const expected = fs.readFileSync(path.resolve(__dirname, 'fixtures/stylish_expected.txt'), 'utf-8');
  expect(diff).toBe(expected.trim());
});
