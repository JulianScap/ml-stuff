import { argv } from 'node:process';

const settingsNumber = parseInt(argv?.[2]);

if (typeof settingsNumber !== 'number')
{
    throw `number expected, received ${argv?.[2]}`;
}

export { settingsNumber };
