import jsonFormatter from '../src/formatters/json.js';

const diffTree = [
  { key: 'follow', type: 'removed', value: true },
  { key: 'common', type: 'nested', children: [
    { key: 'setting1', type: 'unchanged', value: 'Value' },
    { key: 'setting2', type: 'removed', value: 200 },
    { key: 'setting3', type: 'updated', oldValue: true, newValue: null },
  ]},
  { key: 'verbose', type: 'added', value: true },
];

test('json formatter outputs valid JSON', () => {
  const output = jsonFormatter(diffTree);
  const parsed = JSON.parse(output);
  expect(parsed).toEqual(diffTree);
});
