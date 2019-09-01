import dbFactory from '../dbFactory';
import { writable } from 'svelte/store';

export const projects = writable(dbFactory(`projects.db`));
export const divisions = writable(dbFactory(`divisions.db`));
export const types = writable(dbFactory(`types.db`));
export const tasks = writable(dbFactory(`tasks.db`));
export const logs = writable(dbFactory(`logs.db`));
