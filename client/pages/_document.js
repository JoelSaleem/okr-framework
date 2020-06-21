import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
  }

  render() {
    console.log("rendered" );
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons@4.8.0/css/tachyons.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        
      </html>
    );
  }
}
