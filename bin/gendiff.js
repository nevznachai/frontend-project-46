#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
    console.log('format:', options.format);
  });

program.parse(process.argv);
