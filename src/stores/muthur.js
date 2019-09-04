import { writable } from 'svelte/store';

export const viewMode = writable(`Tasks`);
export const message = writable(``);
export const projectsCount = writable(null);
export const tasksCount = writable(null);
export const newProject = writable({});
export const newTask = writable({});
