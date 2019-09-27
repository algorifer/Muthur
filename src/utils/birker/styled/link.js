export default txt => {
  const attr = txt.split(' | ');
  return `<a href=${attr[0]}>${attr[1] ? attr[1] : attr[0]}</a>`;
};
