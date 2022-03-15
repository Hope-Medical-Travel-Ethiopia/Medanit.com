import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:type" content="article" />
          <meta
            property="og:description"
            content="DESCRIPTION OF PAGE CONTENT"
          />
          <meta property="og:image" content="LINK TO THE IMAGE FILE" />
          <meta property="og:url" content="https://www.medanit.com" />
          <meta property="og:site_name" content="Medanit" />
        </Head>
        <body className="DOCUMENT overflow-x-hidden ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
