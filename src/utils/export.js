const {dialog, app} = require('electron').remote;
const fs = require('fs');
const path = require('path');

import {get} from 'svelte/store';
import {
  dbTerms,
  dbDivisions,
  dbTypes,
  dbTasks,
  dbLogs,
  dbUser
} from '../stores/db';

const createData = async () => {
  const user = await get(dbUser)
    .find()
    .then()
    .catch(err => console.log(err));
  const terms = await get(dbTerms)
    .find()
    .then()
    .catch(err => console.log(err));
  const divisions = await get(dbDivisions)
    .find()
    .then()
    .catch(err => console.log(err));
  const types = await get(dbTypes)
    .find()
    .then()
    .catch(err => console.log(err));
  const tasks = await get(dbTasks)
    .find()
    .then()
    .catch(err => console.log(err));
  const logs = await get(dbLogs)
    .find()
    .then()
    .catch(err => console.log(err));

  return {user, terms, divisions, types, tasks, logs};
};

export default () =>
  dialog.showSaveDialog(null, {defaultPath: `muthur`}, loc => {
    if (loc === undefined) return;
    if (loc.indexOf('.json') < 0) {
      loc += '.json';
    }

    createData()
      .then(res => fs.writeFileSync(loc, JSON.stringify(res, null, 2)))
      .catch(err => console.log(err));
  });
