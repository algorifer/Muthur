import parseLine from './parseLine';

export default input =>
  input
    .split(`\n\n`)
    .map(line => parseLine(line))
    .join(``);
