const fs = require('fs');
const {dialog, app} = require('electron').remote;

import {get} from 'svelte/store';
import {
  dbTerms,
  dbDivisions,
  dbTypes,
  dbTasks,
  dbLogs,
  dbUser
} from '../stores/db';

const readData = loc => {
  if (!loc) return;
  if (!fs.existsSync(loc)) {
    console.warn('Source', 'File does not exist: ' + loc);
    return;
  }
  return JSON.parse(fs.readFileSync(loc, 'utf8'));
};

const importUser = async data => {
  if (!data) return `error`;
  if (!data[0].name && !data[0].desc) return `error`;
  await get(dbUser)
    .insert(data)
    .then()
    .catch(err => console.log(err));
};

const importTerms = async data => {
  if (!data) return `error`;
  const checkData = data.filter(item => item.name && item.desc);
  if (checkData.length === 0) return `error`;
  await get(dbTerms)
    .insert(checkData)
    .then()
    .catch(err => console.log(err));
};

const importDivisions = async data => {
  if (!data) return `error`;
  const checkData = data.filter(item => item.name && item.desc);
  if (checkData.length === 0) return `error`;
  await get(dbDivisions)
    .insert(checkData)
    .then()
    .catch(err => console.log(err));
};

const importTypes = async data => {
  if (!data) return `error`;
  const checkData = data.filter(item => item.name && item.desc);
  if (checkData.length === 0) return `error`;
  await get(dbTypes)
    .insert(checkData)
    .then()
    .catch(err => console.log(err));
};

const importTasks = async data => {
  if (!data) return `error`;
  const checkData = data.filter(item => item.name && item.term);
  if (checkData.length === 0) return `error`;
  await get(dbTasks)
    .insert(checkData)
    .then()
    .catch(err => console.log(err));
};

const importLogs = async data => {
  if (!data) return `error`;
  const checkData = data.filter(item => item.date && item.time && item.term);
  if (checkData.length === 0) return `error`;
  await get(dbLogs)
    .insert(checkData)
    .then()
    .catch(err => console.log(err));
};

const createDb = async data => {
  const user = await importUser(data.user);
  if (user === `error`) return `error`;
  const terms = await importTerms(data.terms);
  const divisions = await importDivisions(data.divisions);
  const types = await importTypes(data.types);
  const tasks = await importTasks(data.tasks);
  const logs = await importLogs(data.logs);
  return {user, terms, divisions, types, tasks, logs};
};

export default async () => {
  const paths = dialog.showOpenDialog(app.win, {
    properties: ['openFile'],
    filters: [{name: 'JSON', extensions: ['json']}]
  });
  if (!paths) {
    console.log('Nothing to load');
    return;
  }
  const data = readData(paths[0]);
  const result = await createDb(data);
  return result;
};
