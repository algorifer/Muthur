import fixFloat from './fixJsFloat';

export default logs =>
  fixFloat(logs.reduce((hours, log) => hours + log.time, 0));
