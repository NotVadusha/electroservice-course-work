import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
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
            Увійти в свій аккаунт
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              alignItems={"center"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <FormLabel id="firstName-label">
                  Унікальний номер вашого рахунку
                </FormLabel>
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
              <Button type="submit">Увійти</Button>
            </Box>
          </form>
          <Typography>
            Нема акаунту? <Button variant="text">Створити</Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
