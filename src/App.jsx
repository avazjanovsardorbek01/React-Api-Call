import React from "react";
import UserTable from "./components/UserTable";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom></Typography>
      <UserTable />
    </Container>
  );
}

export default App;
