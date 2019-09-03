import dbFactory from '../dbFactory';
import { readable, get } from 'svelte/store';

// Stores
import { newProject } from './app';

export const projects = readable(dbFactory(`projects.db`));
export const divisions = readable(dbFactory(`divisions.db`));
export const types = readable(dbFactory(`types.db`));
export const tasks = readable(dbFactory(`tasks.db`));
export const logs = readable(dbFactory(`logs.db`));

export const addProjectDB = () =>
  get(projects)
    .insert(get(newProject))
    .then(res => console.log(res))
    .catch(err => console.log(err));
