import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ServicesList from "../components/ServicesList";

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Box
          sx={{
            padding: "10rem 5rem",
            textAlign: "left",
            background: "rgba(0,0,255,0.1)",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h3" component="h1" color="secondary">
            Переходь на тариф день-ніч
          </Typography>
          <Box sx={{ marginTop: 2, "& > *": { marginRight: 2 } }}>
            <Button variant="outlined" color="secondary">
              Змінити тариф
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: "-50px 0" }}>
          <ServicesList />
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
