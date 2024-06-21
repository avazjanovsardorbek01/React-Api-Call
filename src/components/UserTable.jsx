import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleSave = () => {
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  return (
    <Container sx={{ paddingLeft: "169px", paddingTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Table
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Website</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.website}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this user, please change the necessary fields and click
            save.
          </DialogContentText>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={editUser?.name || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="username"
              label="Username"
              type="text"
              fullWidth
              value={editUser?.username || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={editUser?.email || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              value={editUser?.phone || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="website"
              label="Website"
              type="text"
              fullWidth
              value={editUser?.website || ""}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserTable;
