// Based on https://github.com/newfivefour/wildlife-analysis

export default (txt, styles) => {
  const normalTokenFn = t => t;

  const state = {
    pos: -1,
    isGrabbingOther: false,
    currentMatcher: undefined,
    currentEndToken: undefined,
    tokens: []
  };

  const isEndInput = pos => pos >= txt.length - 1;
  const currentEndMark = () => state.currentMatcher.marks[1];
  const startMatchers = styles.map(s => s.marks[0]);
  const startMarkerOrNull = pos =>
    startMatchers.filter(t => t === txt.substr(pos, t.length))[0];
  const matcherFor = mark => styles.filter(t => t.marks[0] == mark)[0];
  const hasOtherGrabEnded = pos =>
    state.isGrabbingOther && startMarkerOrNull(pos);
  const shouldStartToken = () =>
    state.currentMatcher == undefined && !state.isGrabbingOther;
  const getCurrentToken = pos => txt.substring(state.pos, pos);

  const makeToken = txt => ({
    fn: state.currentMatcher ? state.currentMatcher.fn : normalTokenFn,
    txt
  });

  const hasTokenEnded = pos => {
    if (!state.currentMatcher) return false;
    let match = txt.substr(pos).match(new RegExp('^' + currentEndMark()));
    return match ? match[0] : false;
  };

  for (let i = 0; i < txt.length; i++) {
    if (isEndInput(i) && !hasTokenEnded(i)) {
      state.tokens.push(makeToken(getCurrentToken(i + 1)));
    } else if (hasOtherGrabEnded(i)) {
      state.tokens.push(makeToken(getCurrentToken(i)));
      state.isGrabbingOther = false;
      state.currentMatcher = undefined;
      i = i - 1;
      state.pos = i;
    } else if ((state.currentEndToken = hasTokenEnded(i))) {
      state.tokens.push(makeToken(getCurrentToken(i)));
      i = i + (state.currentEndToken.length - 1);
      state.currentMatcher = undefined;
      state.pos = i + 1;
    } else if (shouldStartToken()) {
      let marker = startMarkerOrNull(i);
      if (marker) {
        i = i + marker.length;
        state.currentMatcher = matcherFor(marker);
        state.pos = i;
      } else {
        state.isGrabbingOther = true;
        state.pos = i;
      }
    }
  }

  return state.tokens;
};
