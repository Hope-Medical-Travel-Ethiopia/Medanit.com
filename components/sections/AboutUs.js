import 'lazysizes';

const AboutUs = ({ content }) => {
  return (
    <section className="lg:p-20 p-5 min-h-screen flex flex-col justify-center">
      <section>
        <div className="flex flex-col items-center lg:w-[60%] w-full text-center justify-center m-auto">
          <h1
            className="text-4xl uppercase font-black tracking-wide leading-none
          text-transparent bg-clip-text bg-gradient-to-br from-blue-500 mb-5
          via-sky-600 to-cyan-500"
          >
            {content.mainTitle}
          </h1>
          <p className="text-gray-600 text-sm">{content.mainDescription}</p>
        </div>
      </section>
      <section className=" flex  items-start md:flex-row  flex-col  lg:justify-between justify-center items-center pt-10 pb-20  gap-20">
        <section className="Video-section md:w-1/2 rounded-full ">
          <iframe
            className="md:w-[45vw] w-[90vw] m-auto lazyload"
            width="560"
            height="315"
            data-src="https://www.youtube.com/embed/flQkubck0j4"
            title="MEDANIT"
          ></iframe>
        </section>
        <section className="description md:w-1/2 w-full  md:h-full flex flex-col justify-center">
          <div className="title text-3xl text-blue-500 font-black uppercase my-5 text-center">
            {content.subTitle}
          </div>
          <div className="description text-gray-700">
            {content.subDescription}
          </div>
        </section>
      </section>
    </section>
  );
};

export default AboutUs;
