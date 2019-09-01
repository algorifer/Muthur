export default function typewriter(node, { speed = 30 }) {
  const valid =
    node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;

  if (!valid) {
    //Переход работает только для элементов, содержащих внутри только текст
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;
  const duration = text.length * speed;

  return {
    duration,
    tick: t => {
      const i = ~~(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
