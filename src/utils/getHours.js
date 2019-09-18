export default logs => logs.reduce((hours, log) => hours + log.time, 0);
