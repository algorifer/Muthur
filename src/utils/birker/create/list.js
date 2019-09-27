import createListItem from './listItem';

export default txt =>
  `<ul>${txt
    .slice(2)
    .split(`- `)
    .map(item => createListItem(item))
    .join('')}</ul>`;
