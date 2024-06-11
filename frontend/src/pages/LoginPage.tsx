import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import localhostInstance from "../httpService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userMail, setUserMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    data: loginData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["login"],
    queryFn: () => {
      return localhostInstance.get("/clients/login", {
        params: {
          userMail,
          password,
        },
      });
    },
  });

  if (!isLoading && loginData?.data) {
    localStorage.setItem("userMail", loginData.data.email);
    localStorage.setItem("password", loginData.data.password);
  }

  if (localStorage.getItem("userMail") && localStorage.getItem("password")) {
    navigate("/");
  }

  return (
    <Box minHeight={"95vh"} display={"flex"} alignItems={"center"}>
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={6}
        >
          <Typography
            component={"h1"}
            fontSize={24}
            fontWeight={500}
            color={"primary"}
          >
            Увійти в свій аккаунт
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            alignItems={"center"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="mail-label">Ваша пошта</FormLabel>
              <TextField
                label-id="mail-label"
                type="email"
                id="mail"
                label="Пошта"
                value={userMail}
                onChange={(e) => setUserMail(e.target.value)}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel id="password-label">Ваш пароль</FormLabel>
              <TextField
                label-id="password-label"
                type="password"
                id="password"
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button
              disabled={userMail.length < 1 || password.length < 1}
              onClick={() => refetch()}
            >
              Увійти
            </Button>
          </Box>
          <Typography>
            Нема акаунту?{" "}
            <Button variant="text" href="/register">
              Створити
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
