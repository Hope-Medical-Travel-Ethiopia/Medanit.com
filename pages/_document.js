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
          {/* <title>
            Medanit Ethiopian Medical Directory | find Doctors , Hospitals ,
            Pharmacies in Ethiopia
          </title> */}
          <meta
            property="og:description"
            content="Medanit is the best place to find Ethiopian medical information. Find doctors in Ethiopia , hospitals in Ethiopia, pharmacies in Ethiopia, laboratories in Ethiopia. Search for the best doctors in Medanit, Ethiopian Online Medical Search Engine. Welcome to the largest online directory of doctors in Ethiopia. Medanit is an global online medical search engine and referral service providing best quality doctors and facilities in Ethiopia."
          />
          <meta
            name="description"
            content="Medanit is the best place to find Ethiopian medical information. Find doctors in Ethiopia , hospitals in Ethiopia, pharmacies in Ethiopia, laboratories in Ethiopia. Search for the best doctors in Medanit, Ethiopian Online Medical Search Engine. Welcome to the largest online directory of doctors in Ethiopia. Medanit is an global online medical search engine and referral service providing best quality doctors and facilities in Ethiopia."
          />
          <meta
            name="keywords"
            content="Medanit , Medanit Medical , Doctors in Ethiopia, Ethiopian Doctors, Ethiopian Specialist Doctors , Hospitals in Ethiopia , Ethiopian Hospitals , Pharmacy in Ethiopia , Find Pharmacy in Ethiopia  "
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
