import dbFactory from '../dbFactory';
import { readable } from 'svelte/store';

export const dbProjects = readable(dbFactory(`projects.db`));
export const dbDivisions = readable(dbFactory(`divisions.db`));
export const dbTypes = readable(dbFactory(`types.db`));
export const dbTasks = readable(dbFactory(`tasks.db`));
export const dbLogs = readable(dbFactory(`logs.db`));
