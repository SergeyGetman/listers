export const firstWordWrap = (word: string) => {
  if (word) {
    const words = word.split(' ');
    if (word.length > 1) {
      return (
        <span>
          {words[0]} <br /> {words.slice(1, word.length).join(' ')}
        </span>
      );
    }
    return word;
  }
  return '';
};
