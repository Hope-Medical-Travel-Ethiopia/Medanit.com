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

  const [pending, setPending] = React.useState(true);
  const [data, setData] = React.useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // setRows(data);
      // const data = diagnostics;
      setData(diagnostics);

      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-36">
      <DataTable
        title="Lista de Peliculas"
        columns={columns}
        data={data}
        pagination
        progressPending={pending}
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

{
  /* <div className="medication w-full bg-white px-10 py-5 my-5 rounded-lg flex items-center justify-between flex-wrap">
  <h1 className="text-xl font-bold tracking-wider text-blue-500 w-48">
    {name}
  </h1>
  <p className="text-sm text-gray-600 text-wrap overflow-hidden justify-self-start  w-96 max-w-96 ">
    {description}
  </p>
  <div className="action flex  gap-5 justify-center">
    {fromMed && (
      <Link href={`/Admin/${type}/Edit/${id}`}>
        <a className="px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
          <FaEdit className="text-xl stroke-1 " />
        </a>
      </Link>
    )}
    <button
      onClick={() => handleClickOpen()}
      className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all"
    >
      <FaTrash className="text-xl stroke-1" />
    </button>
  </div>
</div>; */
}
