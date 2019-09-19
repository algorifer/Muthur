const {app} = require('electron');
const Datastore = require('nedb-promises');
import {readable} from 'svelte/store';

const dbFactory = fileName =>
  Datastore.create({
    filename: `${
      !process.env.ROLLUP_WATCH ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    timestampData: false,
    autoload: true
  });

export const dbProjects = readable(dbFactory(`projects.db`));
export const dbDivisions = readable(dbFactory(`divisions.db`));
export const dbTypes = readable(dbFactory(`types.db`));
export const dbTasks = readable(dbFactory(`tasks.db`));
export const dbLogs = readable(dbFactory(`logs.db`));
