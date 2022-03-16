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
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Medanit is the best place to find medical information, doctors, hospitals, pharmacies, laboratories and maps of Ethiopia. Search for the best doctors in Medanit, Ethiopian Online Medical Search Engine. Welcome to the largest online directory of doctors in Ethiopia. Medanit is an global online medical search engine and referral service providing best quality doctors and facilities in Ethiopia."
          />
          <meta property="og:image" content="/Logo.png" />
          <meta property="og:url" content="https://www.medanit.com" />
          <meta property="og:site_name" content="Medanit" />
          <link rel="icon" href="/icon.png" />
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
