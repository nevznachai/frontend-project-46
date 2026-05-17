import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fixturesDir = path.resolve(__dirname, '../_fixtures_');

test('gendiff stylish JSON', () => {
  const filepath1 = path.join(fixturesDir, 'file1.json');
  const filepath2 = path.join(fixturesDir, 'file2.json');

  const diff = genDiff(filepath1, filepath2, 'stylish');

  const expected = fs.readFileSync(
    path.join(fixturesDir, 'stylish_expected.txt'),
    'utf-8',
  );

  expect(diff).toBe(expected.trim());
});
