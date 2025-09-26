import { renderToStaticMarkup } from 'react-dom/server';

export function renderTemplate(element: React.ReactElement): string {
  const html = renderToStaticMarkup(element);
  return `<!doctype html>${html}`;
}
