import serialize from "serialize-javascript";

const renderFullPage = (markup, initialState, css) => {
  return `
    <!DOCTYPE html>
    <html lang="en-us">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cream Cheese: All the words you eat</title>
      <script>window.__INITIAL_DATA__=${serialize(initialState)}</script>
      <style id="jss-server-side">${css}</style>
      </head>

      <body>
        <div id="app">${markup}</div>
        <script src="/runtime.bundle.js"></script>
        <script src="/vendors.bundle.js"></script>
        <script src="/app.bundle.js"></script>
      </body>
    </html>
    `;
};

export default renderFullPage;