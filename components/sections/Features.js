import Image from "next/image";
import {
  FaUserMd,
  FaSearchLocation,
  FaBusinessTime,
  FaMicroscope,
  FaStethoscope,
  FaXRay,
} from "react-icons/fa";
import image from "../../public/Doc4.jpg";
import image2 from "../../public/laboratory.jpg";
import image3 from "../../public/docs.jpg";
import image4 from "../../public/cdc-_N7I1JyPYJw-unsplash.jpg";

const feat = {
  title: "features",
  desc:
    "Medanit.com is coming to change the health care system , here are some feat you will be expecting from us.",
  one: {
    title: "Easy find",
    desc:
      "On medanit you can search by speciality or symptoms , to easilty find the right provider for you.",
  },
  two: {
    title: "Specialty",
    desc:
      "on Medanit you Find doctors and hospitals based on the factors that matter most to you.",
  },
  three: {
    title: "Schedule",
    desc:
      "On Medanit , you can see doctor's schedule , and open appointment times from where ever you are.",
  },
  four: {
    title: "Diagnostic Imaging",
    desc:
      "Medanit will lead you to where to find Diagnostic imaging like ultrasounds , x-rays , MRIs or CT scans and more",
  },
  five: {
    title: "Prescription",
    desc:
      "If you have been given a prescription, Medanit can help you identify reliable providers. ",
  },
  six: {
    title: "Many more",
    desc:
      "This is Just the beginning , Medanit is coming with more feat , to change the health care system.",
  },
};
const Features = () => {
  return (
    <div
      className="lg:py-32 py-10 flex flex-col 
    justify-center items-center  lg:px-10 px-20 w-full"
    >
      <div className="feat-heading text-gray-600 text-center lg:w-[50%]">
        <h1 className="lg:text-4xl text-2xl mb-2 font-black uppercase underline tracking-widest  underline-offset-8 text-blue-500 leading-loose">
          MEDANIT <span className="text-gray-800">{feat.title}</span>
        </h1>
        <p className="text-sm">{feat.desc}</p>
      </div>
      <div className="Cards mt-10 w-[80%]  flex gap-10 flex-wrap w-[80%] justify-center">
        <Card
          title={feat.one.title}
          picture={image2}
          body={feat.one.desc}
          alt={`${feat.one.title} - image`}
        />
        <Card
          title={feat.two.title}
          picture={image4}
          body={feat.two.desc}
          alt={`${feat.two.title} - image`}
        />

        <Card
          title={feat.three.title}
          picture={image2}
          body={feat.three.desc}
          alt={`${feat.three.title} - image`}
        />
        <Card
          title={feat.four.title}
          picture={image3}
          body={feat.four.desc}
          alt={`${feat.four.title} - image`}
        />
        <Card
          title={feat.five.title}
          picture={image}
          body={feat.five.desc}
          alt={`${feat.five.title} - image`}
        />
        <Card
          title={feat.six.title}
          picture={image3}
          body={feat.six.desc}
          alt={`${feat.six.title} - image`}
        />
      </div>
    </div>
  );
};

const Card = ({ title, body, picture, alt }) => {
  return (
    <div
      className="card my-5 rounded-lg  
    transform ease-in duration-100 hover:drop-shadow-xl  
    bg-white text-center lg:w-72 pb-10  flex flex-col"
    >
      <div className="image  h-48 overflow-hidden object-scale-down">
        <Image
          src={picture}
          alt={alt}
          className="rounded-t-lg object-scale-down"
        />
      </div>
      <div className="card-title text-xl   px-5 font-bold mt-6 mb-2">
        <h1 className="text-blue-500">{title}</h1>
      </div>
      <div className="card-description px-5">
        <p className="text-sm  text-gray-500">{body}</p>
      </div>
    </div>
  );
};

// export default Card;
export default Features;
