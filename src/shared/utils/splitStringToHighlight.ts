export const splitStringToHighlight = (string: string, highlightWords: number): [string, string] => {
  const words: string[] = string.split(' ');
  const highlight: string = words.slice(0, highlightWords).join(' ');
  const remaining: string = words.slice(highlightWords).join(' ');
  return [highlight, remaining];
};
