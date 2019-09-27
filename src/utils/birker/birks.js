import createParagraph from './create/paragraph';
import createTitle from './create/title';
import createList from './create/list';

export default {
  '#': createTitle,
  '-': createList,
  default: createParagraph
};
