export const setDocumentTitle = (title: string = '') => {
  const defaultString = '- hubmee';

  document.title = `${title || ''} ${defaultString}`;
};
