import {writable} from 'svelte/store';

export const viewMode = writable(`tasks`);
export const viewPage = writable(false);
