import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Backdrop, Box, Fade, Typography } from "@mui/material";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function createData(Users) {
  return { Users };
}

const initialRows = [
  createData("User1"),
  createData("User2"),
  createData("User3"),
  createData("User4"),
  createData("User5"),
];

export default function CustomPaginationActionsTable() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataUpdated, isDataUpdated] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:8001/getusers");
        console.log(data);
        setUserData(data);
      } catch (err) {
        console.log("err", err);
        alert(err.response?.data?.message);
      }
    }
    fetchData();
    console.log("useEffect");
  }, [dataUpdated]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (user) => {
    setSelectedRow(user);
    setOpenModal(true);
  };

  const handleDeleteConfirm = async () => {
    // if (selectedRow) {
    //   const updatedRows = rows.filter((r) => r !== selectedRow);
    //   setRows(updatedRows);
    //   setSelectedRow(null);
    //   setOpenModal(false);
    // }
    if (selectedRow) {
      try {
        const { data } = await axios.put(
          `http://localhost:8001/deleteuser/${selectedRow.id}`
        );
        console.log(data);
        isDataUpdated((prev) => !prev);
        setOpenModal(false);
      } catch (err) {
        console.log("err", err);
        alert(err.response?.data?.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          color: "#2f10eb",
          margin: "50px 0",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        <span style={{ borderBottom: "2px solid #2f10eb", padding: "0 10px" }}>
          Admin Dashboard
        </span>
        <div
          className="navchild"
          onClick={handleLogout}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <h4>LOGOUT</h4>
          <img src="sign.png" alt="" />
        </div>
      </Typography>

      <Box
        sx={{
          border: "2px solid #eff5f8",
          width: "60%",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 500, background: "#eff5f8" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Users</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: "#2f10eb",
                        fontWeight: "bold",
                        paddingRight: "0px",
                      }}
                    >
                      {user.data.email}
                    </TableCell>
                    <DeleteIcon
                      onClick={() => handleDeleteClick(user)}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        transition: "color 0.3s",
                        marginLeft: "5px",
                        marginTop: "5px",
                        color: "red",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "red";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "black";
                      }}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              background: "#eff5f8",
            }}
          >
            <Button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              style={{ marginRight: 10 }}
            >
              <FcPrevious />
            </Button>
            <Button
              onClick={() => handleChangePage(page + 1)}
              disabled={userData.length <= (page + 1) * rowsPerPage}
            >
              <FcNext />
            </Button>
          </div>
        </TableContainer>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <p>
              Are you sure you want to delete{" "}
              {selectedRow ? selectedRow.Users : ""}?
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirm}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(false)}
              style={{ marginLeft: "20px" }}
            >
              No
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
