export const IS_BROWSER = Boolean(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);
