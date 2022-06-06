import { FaEdit, FaTrash } from "react-icons/fa";
import React from "react";
import pic from "../../public/DocDefault.jpg";

import axios from "../../lib/axios";
import DataTable from "react-data-table-component";
import { useAuth } from "../../hooks/auth";

import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaEye } from "react-icons/fa";

export const DoctorsList = ({
  name,
  description,
  // id,
  type,
  providerId,
  fromDoctors,
  medications,
}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth({ middleware: "auth" });

  const handleDelete = async (id) => {
    if (providerId) {
      const response = await axios
        .delete(`/api/${type}/${providerId}/${id}`)
        .then((response) => {
          router.push(`/Admin/Pharmacy/${providerId}`);
          handleClose();
        });
    } else {
      const response = await axios
        .delete(`/api/${type}/${id}`)
        .then((response) => {
          // router.push(`/Admin/${type}`);
          router.reload();

          handleClose();
        });
    }
  };

  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // maxWidth: "300px",
      wrap: true,
    },
    {
      name: "Description",
      selector: (row) => row.speciality,
      sortable: true,
      wrap: true,
    },
    {
      name: "Agent",
      selector: (row) => row.agent_name,
      sortable: true,
      wrap: true,
    },
    {
      cell: (row) => (
        <div className="action flex  w-full gap-3 justify-center">
          <Link className="mx-2" href={`/Admin/${type}/${row.id}`}>
            <a className="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
              <FaEye className="text-xl stroke-1" />
            </a>
          </Link>

          {(user.role == 0 || row.agent_id == user.id) && (
            <>
              <Link className="mx-2" href={`/Admin/${type}/Edit/${row.id}`}>
                <a
                  className="px-4 py-2 border-emerald-500 border rounded-md 
              text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all"
                >
                  <FaEdit className="text-xl stroke-1 " />
                </a>
              </Link>

              <button
                onClick={() => handleClickOpen(row.id)}
                className="px-4  py-2 border-red-500 border rounded-md 
            text-red-500 hover:bg-red-600 hover:text-white transition-all"
              >
                <FaTrash className="text-xl stroke-1" />
              </button>
            </>
          )}
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: "200px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minWidth: "900px",
        maxWidth: "1000px",
      },
    },
  };

  const data = medications;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo this action if you proceed with it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className="mt-2 width-full ">
        <DataTable
          // title="Medications"
          columns={columns}
          data={data}
          pagination
          customStyles={customStyles}
          striped={true}

          // paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </>
  );
};
