import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button href="/" variant="text">
            <Typography variant="h6" color="white">
              Одеські електромережі
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Link href="/QnA" color={"#FFF"} variant="body2">
            Під'єднатись
          </Link>
          <Link href="/login" color={"#FFF"} variant="body2">
            Повідомити про помилку
          </Link>
          <Link href="/login" color={"#FFF"} variant="body2">
            Повідомити про помилку
          </Link>
        </Box>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Link href="/user">
            <Avatar />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
