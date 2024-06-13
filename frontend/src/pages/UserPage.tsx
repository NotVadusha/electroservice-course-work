import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import localhostInstance from "../httpService";

const UserPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const { data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      localhostInstance.get(`/clients/${localStorage.getItem("clientId")}`),
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: (newUser: Record<string, string>) =>
      localhostInstance.put(`/clients/${localStorage.getItem("clientId")}`, {
        ...newUser,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.data[0].first_name);
      setLastName(user.data[0].last_name);
    }
  }, [user]);

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
            {localStorage.getItem("userMail")?.charAt(0)}
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
              <FormLabel id="firstName-label">Ім'я</FormLabel>
              <TextField
                label-id="firstName-label"
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="lastName-label">Прізвище</FormLabel>
              <TextField
                label-id="lastName-label"
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="dateOfBirth-label">Дата народження</FormLabel>
              <TextField
                label-id="dateOfBirth-label"
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </Box>
            <Button
              type="submit"
              onClick={() => {
                updateUser({ firstName, lastName });
              }}
            >
              Зберегти
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("userMail");
                localStorage.removeItem("password");
                localStorage.removeItem("clientId");
                localStorage.removeItem("role");

                navigate("/login");
              }}
            >
              Вийти
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default UserPage;
