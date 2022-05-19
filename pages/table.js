import axios from "./../lib/axios";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import React from "react";

export default function table({ diagnostics }) {
  const handleDelete = async (id) => {
    const response = await axios
      .delete(`/api/Diagnostics/${id}`)
      .then((response) => {
        router.push(`/Admin/diagnostics`);
      });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      cell: (row) => (
        <Button size="small" row={row} onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      ),
      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  const data = diagnostics;

  //   const [filterText, setFilterText] = React.useState("");
  //   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
  //     false
  //   );
  //   const filteredItems = fakeUsers.filter(
  //     (item) =>
  //       item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  //   );

  //   const subHeaderComponentMemo = React.useMemo(() => {
  //     const handleClear = () => {
  //       if (filterText) {
  //         setResetPaginationToggle(!resetPaginationToggle);
  //         setFilterText("");
  //       }
  //     };

  //     return (
  //       <FilterComponent
  //         onFilter={(e) => setFilterText(e.target.value)}
  //         onClear={handleClear}
  //         filterText={filterText}
  //       />
  //     );
  //   }, [filterText, resetPaginationToggle]);
  return (
    <div className="mt-36">
      <DataTable
        title="Lista de Peliculas"
        columns={columns}
        data={data}
        pagination
        // paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
}

export async function getServerSideProps() {
  var data = await axios.get("/api/Medications");
  return {
    props: {
      diagnostics: data.data,
    },
  };
}
