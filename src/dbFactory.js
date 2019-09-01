const { app } = require('electron');
const Datastore = require('nedb-promises');

export default fileName =>
  Datastore.create({
    filename: `${
      !process.env.ROLLUP_WATCH ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    timestampData: true,
    autoload: true
  });
