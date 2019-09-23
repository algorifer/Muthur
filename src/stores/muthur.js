import {writable} from 'svelte/store';

export const viewMode = writable(`init`);
export const viewPage = writable(false);
export const isInput = writable(false);
