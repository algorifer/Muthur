import dbFactory from '../dbFactory';
import { readable } from 'svelte/store';

export const projects = readable(dbFactory(`projects.db`));
export const divisions = readable(dbFactory(`divisions.db`));
export const types = readable(dbFactory(`types.db`));
export const tasks = readable(dbFactory(`tasks.db`));
export const logs = readable(dbFactory(`logs.db`));
