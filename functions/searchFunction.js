import axios from "../lib/axios";

export function searchProviders(
  setMed,
  setIsLoading,
  provider,
  searchTerm,
  setProviderData,
  setImage,
  hospitalPic,
  labPic,
  doctorPic,
  pharmaPic
) {
  return async (event) => {
    event.preventDefault();
    setMed(null);
    setIsLoading(true);

    try {
      let response = await axios.get(
        `/api/search-by-${provider}/${searchTerm}`
      );
      let res = await response.data;
      setProviderData(res[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }

    if (provider == "Pharmacy") {
      try {
        let response = await axios.get(
          `/api/search-by-medication/${searchTerm}`
        );
        let res = await response.data;
        setMed(res);
      } catch (error) {
        // setIsLoading(true);
      }
    }

    if (provider == "Diagnostics") {
      setImage(labPic);
    } else if (provider == "Hospital") {
      setImage(hospitalPic);
    } else if (provider == "Doctors") {
      setImage(doctorPic);
    } else if (provider == "Pharmacy") {
      setImage(pharmaPic);
    }
  };
}
export function changeProviders(
  setProvider,
  setLoading,
  providerState,
  allProviders,
  setproviderState,
  doctorsList,
  setProviders,
  diagnosticsList,
  hospitalList,
  pharmacyList
) {
  return async (event) => {
    setProvider(event.target.value);
    setLoading(true);

    if (!providerState) {
      await axios.get("/api/all").then((response) => {
        allProviders.push(response.data);
        setproviderState(allProviders);
      });
    } else {
      allProviders.push(providerState[0]);
    }

    const targetValue = event.target.value;

    if (targetValue == "Doctors") {
      let doctors = allProviders[0].doctors;
      doctors.map((item) => {
        doctorsList.push(item.name);
        doctorsList.push(item.speciality);
        item.expertise.map((exp) => {
          doctorsList.push(exp);
        });
        setProviders([...new Set(doctorsList)]);
        setLoading(false);
      });
    }

    if (targetValue == "Diagnostics") {
      let diagnostics = allProviders[0].diagnostics;
      diagnostics.map((item) => {
        diagnosticsList.push(item.name);
      });
      let procedures = allProviders[0].procedures;
      procedures.map((item) => {
        diagnosticsList.push(item.name);
      });
      setProviders([...new Set(diagnosticsList)]);
      setLoading(false);
    }

    if (targetValue == "Hospital") {
      let doctors = allProviders[0].doctors;
      doctors.map((item) => {
        hospitalList.push(item.speciality);
      });
      let hospitals = allProviders[0].hospitals;
      hospitals.map((item) => {
        hospitalList.push(item.name);
      });
      setProviders([...new Set(hospitalList)]);
      setLoading(false);
    }

    if (targetValue == "Pharmacy") {
      let pharmacy = allProviders[0].pharmacies;
      pharmacy.map((item) => {
        pharmacyList.push(item.name);
      });
      let medication = allProviders[0].medications;
      medication.map((item) => {
        pharmacyList.push(item.name);
      });
      setProviders([...new Set(pharmacyList)]);
      setLoading(false);
    }
  };
}

export function SearchListing(
  setMed,
  setIsLoading,
  provider,
  searchTerm,
  setProviderData,
  setImage,
  setShowResults,
  labPic,
  doctorPic,
  hospitalPic,
  pharmaPic
) {
  return async (event) => {
    event.preventDefault();
    setMed(null);
    setIsLoading(true);

    try {
      let response = await axios.get(
        `/api/search-by-${provider}/${searchTerm}`
      );
      let res = await response.data; // console.log(res);

      setProviderData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }

    if (provider == "Pharmacy") {
      try {
        let response = await axios.get(
          `/api/search-by-medication/${searchTerm}`
        );
        let res = await response.data;
        setMed(res);
      } catch (error) {
        // setIsLoading(true);
      }
    }

    if (provider == "Diagnostics") {
      setImage(labPic);
    } else if (provider == "Hospital") {
      setImage(hospitalPic);
    } else if (provider == "Doctors") {
      setImage(doctorPic);
    } else if (provider == "Pharmacy") {
      setImage(pharmaPic);
    }

    setShowResults(true);
  };
}
