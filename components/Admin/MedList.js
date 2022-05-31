import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import axios from "../../lib/axios";
import DataTable from "react-data-table-component";

import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../hooks/auth";

export const MedList = ({
  name,
  description,
  // id,
  type,
  providerId,
  fromMed,
  medications,
}) => {
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });

  const data = medications;

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
          router.push(`/Admin/${type}`);
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
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    },
    {
      name: "Agent",
      selector: (row) => (row.pivot ? row.pivot.agent_name : row.agent_name),
      sortable: true,
      wrap: true,
    },
    {
      cell: (row) => (
        <>
          {(user.role == 0 || row.agent_id == user.id) && fromMed && (
            <Link href={`/Admin/${type}/Edit/${row.id}`}>
              <a
                className="px-4 py-2 border-emerald-500 border rounded-md 
              text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all"
              >
                <FaEdit className="text-xl stroke-1 " />
              </a>
            </Link>
          )}

          {
            <button
              onClick={() => handleClickOpen(row.id)}
              className="px-4 mx-2 py-2 border-red-500 border rounded-md 
            text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              <FaTrash className="text-xl stroke-1" />
            </button>
          }
        </>
      ),
      allowOverflow: true,
      button: true,
      // width: "56px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        maxWidth: "1000px",
      },
    },
  };

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

      <div className="mt-10 ">
        {data && (
          <DataTable
            // title="Medications"
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            striped={true}

            // paginationComponentOptions={paginationComponentOptions}
          />
        )}
      </div>
    </>
  );
};
