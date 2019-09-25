const birkers = [
  // Paragraph
  {
    birks: ['\n§', '\n'],
    format: t => `<p>${parser(t)}</p>`
  },
  // List
  {
    birks: ['\n\n- ', '\n[^-]'],
    skipChars: 0,
    format: t =>
      `<ul>${t
        .split('\n- ')
        .map(s => `<li>${parser(s)}</li>`)
        .join('')}</ul>`
  },
  // Number list
  {
    birks: ['\n\n0. ', '\n[^0]'],
    skipChars: 0,
    format: t =>
      `<ol>${t
        .split('\n0. ')
        .map(s => `<li>${parser(s)}</li>`)
        .join('')}</ol>`
  },
  // # Title
  {birks: ['\n#', '\n'], format: t => `<h2>${t}</h2>`},
  // *bold*
  {birks: ['*', '\\*'], format: t => `<b>${t}</b>`},
  // _italic_
  {birks: ['_', '\\_'], format: t => `<i>${t}</i>`},
  // [[href | link text ]]
  {
    birks: ['[[', ']]'],
    format: t => {
      t = t.split(' | ');
      return `<a href=${t[0]}>${t[1]}</a>`;
    }
  },
  // ![src | img_alt]]
  {
    birks: ['![', ']]'],
    format: t => {
      t = t.split(' | ');
      return `<img src=${t[0]} alt=${t[1]} />`;
    }
  }
];

const everyTokenFormatter = t => t;

const globalFormatter = t =>
  t
    .replace(/  /g, '&nbsp;')
    // .replace(/\n\n/g, "<div style='line-height: 8pt'>&nbsp;</div>")
    .replace(/\n/g, '<br>');

const parser = text => {
  // State
  const parseState = {
    pos: -1,
    isGrabbingOther: false,
    currentBirker: undefined
  };

  // Checks
  const isEndInput = pos => pos >= text.length - 1;
  const hasOtherGrabEnded = pos =>
    parseState.isGrabbingOther && startMarkerOrNull(pos);
  const shouldStartToken = () =>
    parseState.currentBirker == undefined && !parseState.isGrabbingOther;

  // Get
  const startBirkers = birkers.map(t => t.birks[0]);
  const currentEndBirk = () => parseState.currentBirker.birks[1];
  const skipEndMatchChars = () => parseState.currentBirker.skipChars || 0;
  // find the first start matcher for the position in the text
  const startMarkerOrNull = pos =>
    startBirkers.filter(t => t === text.substr(pos, t.length))[0];
  // if we have the starting marker, we can match it against a filter
  const matcherFor = mark => birkers.filter(t => t.birks[0] == mark)[0];
  // if we're not currently grabbing misc tet and we're not in the middle of a token grab
  // from the saved token start position to now, return the grabbed text
  const getCurrentToken = pos => text.substring(parseState.pos, pos);

  // token used for misc text
  const normalToken = {name: 'normal', transform: t => t, format: t => t};
  //token that has matcher and the matched text
  const makeToken = text => ({
    matcher: parseState.currentBirker || normalToken,
    text: text
  });

  // if we're looking at at token, and match its end marker, return the size of the end marker
  const hasTokenEnded = pos => {
    if (!parseState.currentBirker) return false;
    let match = text.substr(pos).match(new RegExp(`^${currentEndBirk()}`));
    return match ? match[0] : false;
  };

  let tokens = [],
    currentEndToken = undefined;

  for (var pos = 0; pos < text.length; pos++) {
    if (isEndInput(pos) && !hasTokenEnded(pos)) {
      // If we're at the end of the input add the token to the array
      tokens.push(makeToken(getCurrentToken(pos + 1)));
    } else if (hasOtherGrabEnded(pos)) {
      // Read this third:
      //
      // If the miscelaneous grabbing of text has ended
      // 1. Push all that to the tokens array.
      // 2. Set the parse state to undefined for the next loop and go back a character
      tokens.push(makeToken(getCurrentToken(pos)));
      parseState.isGrabbingOther = false;
      parseState.currentBirker = undefined;
      pos = pos - 1;
      parseState.pos = pos; // if the next char is end of string, then the end-of-input if clause will need a starting pos
    } else if ((currentEndToken = hasTokenEnded(pos))) {
      // Read this second:
      //
      // If we were matching a token, and it ended
      // 1. push the current token into an array
      // 2. skip the loop past the end token
      // 3. set the new parsing state to undefined for this loop
      tokens.push(makeToken(getCurrentToken(pos)));
      pos = pos + (currentEndToken.length - 1) + skipEndMatchChars(); // birkers could stay skip back a char
      parseState.currentBirker = undefined;
      parseState.pos = pos + 1;
    } else if (shouldStartToken()) {
      // Read this first:
      //
      // If we know we should start looking for a new token,
      // then look for a new starting marker...
      const marker = startMarkerOrNull(pos);
      if (marker) {
        // And if we have one, set the parsing state to the
        // new marker, and skip the loop past the length
        // of the marker
        pos = pos + marker.length;
        parseState.currentBirker = matcherFor(marker); // first matching
        parseState.pos = pos;
      } else {
        // Otherwise starting grabbing misc text
        parseState.isGrabbingOther = true;
        parseState.pos = pos;
      }
    }
  }

  const textFromTokens = tokens
    .map(t => {
      // format the grabbed text with the matcher's format function
      let tokenText = t.matcher.format(t.text);
      // Sometimes we don't want to replace two spaces with a nbsp;, in <pre>s for example
      tokenText = t.matcher.dontSendToEveryTokenFormatter
        ? tokenText
        : everyTokenFormatter(tokenText);
      return tokenText;
    })
    .join('');
  return globalFormatter(textFromTokens);
};

export default parser;
