const {dialog, app} = require('electron').remote;
const fs = require('fs');
const path = require('path');

import {get} from 'svelte/store';
import {dbProjects, dbDivisions, dbTypes, dbTasks, dbLogs} from '../stores/db';

const createData = async () => {
  // let projects, divisions, types, tasks, logs;

  const projects = await get(dbProjects)
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

  return {projects, divisions, types, tasks, logs};
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
