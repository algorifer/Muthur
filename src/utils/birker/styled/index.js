import styles from './styles';
import createTokens from './createTokens';

const tokenTransform = token => token.fn(token.txt);

const globalTransform = txt => txt.replace(/\n/g, `<br>`);

export default txt =>
  globalTransform(
    createTokens(txt, styles)
      .map(t => tokenTransform(t))
      .join('')
  );
