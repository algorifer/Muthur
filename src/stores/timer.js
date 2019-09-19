const {DateTime} = require('luxon');

import {writable, derived, readable} from 'svelte/store';

export const startTime = writable(false);
export const stopTime = writable(false);

export const time = derived(
  startTime,
  ($startTime, set) => {
    if ($startTime) {
      var interval = setInterval(() => {
        const now = DateTime.local();
        const diff = now.diff($startTime, ['hours', 'minutes']);
        set(diff.hours + Math.ceil((diff.minutes / 60) * 10) / 10);
      }, 1000);
    } else {
      set(false);
    }

    return () => {
      clearInterval(interval);
    };
  },
  false
);
