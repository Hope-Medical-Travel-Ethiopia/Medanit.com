const About = ({ description }) => {
  return (
    <section className="about">
      <div className="card bg-white drop-shadow-lg rounded-lg px-10 py-6">
        <h1 className="text-blue-500 tracking-wider text-lg font-bold mb-3">
          Description
        </h1>
        <p className="text-sm leading-normal">{description}</p>
      </div>
    </section>
  );
};

export default About;
