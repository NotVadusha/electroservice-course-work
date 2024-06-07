import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

const RegisterPage = () => {
  const handleSubmit = () => {};
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
            Створити акаунт
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              alignItems={"center"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="firstName-label">Ваша адреса</FormLabel>
                <TextField
                  label-id="firstName-label"
                  type="text"
                  id="firstName"
                />
              </Box>{" "}
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="firstName-label">Ваше ім'я</FormLabel>
                <TextField
                  label-id="firstName-label"
                  type="text"
                  id="firstName"
                />
              </Box>{" "}
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="firstName-label">Ваше прізвище</FormLabel>
                <TextField
                  label-id="firstName-label"
                  type="text"
                  id="firstName"
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="lastName-label">Пароль</FormLabel>
                <TextField
                  label-id="lastName-label"
                  type="text"
                  id="lastName"
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="lastName-label">Повторіть пароль</FormLabel>
                <TextField
                  label-id="lastName-label"
                  type="text"
                  id="lastName"
                />
              </Box>
              <Button type="submit">Створити</Button>
            </Box>
          </form>
          <Typography>
            Вже маєш акаунт? <Button variant="text">Увійти</Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
