import birks from './birks';

export default line =>
  birks[line.substr(0, 1)] && line.substr(1, 1) === ` `
    ? birks[line.substr(0, 1)](line)
    : birks.default(line);
