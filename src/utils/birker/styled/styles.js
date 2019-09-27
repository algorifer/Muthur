import bold from './bold';
import italic from './italic';
import link from './link';

export default [
  {marks: ['*', '\\*'], fn: bold},
  {marks: ['_', '\\_'], fn: italic},
  {marks: ['[link', ']'], fn: link}
];
