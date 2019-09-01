import { writable } from 'svelte/store';

export const view = writable(`Tasks`);

export const message = writable(``);
