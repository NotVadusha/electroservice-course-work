import { AppBar, Link, Toolbar, Typography, Box, Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="h6">Одеські електромережі</Typography>
          </Box>
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
