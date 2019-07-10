import ReactDOMServer from 'react-dom/server';

export const renderComponent = (component: React.ReactElement): string => {
  try {
    const renderedComponent = ReactDOMServer.renderToStaticMarkup(component);

    return renderedComponent;
  } catch (e) {
    throw Error('Not a valid React component');
  }
};
