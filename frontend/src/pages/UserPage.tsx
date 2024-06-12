import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDateOfBirth(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Navbar />
      <Container>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Avatar
            sx={{ bgcolor: "blue", margin: "4rem 0", width: 128, height: 128 }}
          >
            U
          </Avatar>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            alignItems={"center"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="firstName-label">First Name:</FormLabel>
              <TextField
                label-id="firstName-label"
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="lastName-label">Last Name:</FormLabel>
              <TextField
                label-id="lastName-label"
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="dateOfBirth-label">Date of Birth:</FormLabel>
              <TextField
                label-id="dateOfBirth-label"
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </Box>
            <Button type="submit">Save</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("userMail");
                localStorage.removeItem("password");
                localStorage.removeItem("clientId");
                navigate("/login");
              }}
            >
              Log out
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default UserPage;
