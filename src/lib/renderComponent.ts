import ReactDOMServer from 'react-dom/server';

export const renderComponent = function(
  component: React.ReactElement
) {
  try {
    const renderedComponent = ReactDOMServer.renderToStaticMarkup(component);
    return renderedComponent;
  } catch (e) {
    throw Error('Not a valid React component');
  }
};
