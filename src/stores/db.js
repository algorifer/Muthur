const {app} = require('electron').remote;
const Datastore = require('nedb-promises');
import {readable} from 'svelte/store';

const dbFactory = fileName =>
  Datastore.create({
    filename: `${DEV ? app.getPath('userData') : '.'}/data/${fileName}`,
    timestampData: false,
    autoload: true
  });

export const dbUser = readable(dbFactory(`user.db`));
export const dbTerms = readable(dbFactory(`terms.db`));
export const dbDivisions = readable(dbFactory(`divisions.db`));
export const dbTypes = readable(dbFactory(`types.db`));
export const dbTasks = readable(dbFactory(`tasks.db`));
export const dbLogs = readable(dbFactory(`logs.db`));
