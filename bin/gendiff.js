#!/usr/bin/env node

import { Command } from 'commander';
import parse from '../src/parser.js';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const obj1 = parse(filepath1);
    const obj2 = parse(filepath2);

    const output = genDiff(obj1, obj2, options.format);
    console.log(output);
  });

program.parse();
