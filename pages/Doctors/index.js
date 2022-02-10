import DoctorsListCard from "../../components/sections/DoctorsListCard";
import SearchSection from "../../components/sections/SearchSection";
import image from "../../public/Doc4.jpg";

const Doctors = () => {
  const doc = [
    {
      id: 1,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
    {
      id: 2,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
    {
      id: 3,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
    {
      id: 4,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
    { 
      id: 15,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
    {
      id: 6,
      name: "Dr. John Doe",
      speciality: "Cardiac Surgeon",
      address: "Addis Ababa, Ethiopia",
      hospital:
        "Hope medical Diagnostic center , Wedase Diagnostic center , Amin Hospital",
      picture: { image },
    },
  ];

  return (
    <div className="bg-gray-100 ">
      <section className="searchSection ">
        <SearchSection result="6" query="Dermatology Specialist Doctors" />
      </section>
      <section className="list mt-10 flex flex-wrap justify-center w-2/3 m-auto">
        {doc.map((item) => (
          <DoctorsListCard
            key={item.id}
            name={item.name}
            speciality={item.speciality}
            address={item.address}
            hospital={item.hospital}
            picture={image}
            link={item.id}
          />
        ))}
      </section>
    </div>
  );
};

export default Doctors;
