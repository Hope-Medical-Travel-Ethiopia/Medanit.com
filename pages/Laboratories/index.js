import ProviderListCard from "../../components/sections/ProviderListCard";
import SearchSection from "../../components/sections/SearchSection";
import image from "../../public/laboratory.jpg";

const laboratories = () => {
  const laboratory = [
    {
      id: 1,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
    {
      id: 2,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
    {
      id: 3,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
    {
      id: 4,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
    {
      id: 5,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
    {
      id: 6,
      name: "Hope General laboratory",
      address: "Getu Commercial - Bole Addis ababa, Ethiopia",
      phone: "+251987654321",
    },
  ];

  return (
    <div className="bg-gray-100">
      <section className="searchSection ">
        <SearchSection result="6" query="Dermatology Speciality laboratorys" />
      </section>
      <section className="list mt-10 flex flex-wrap justify-center w-2/3 m-auto">
        {laboratory.map((item) => (
          <ProviderListCard
            key={item.id}
            name={item.name}
            address={item.address}
            phone={item.phone}
            picture={image}
            provider="Laboratories"
          />
        ))}
      </section>
    </div>
  );
};

export default laboratories;
