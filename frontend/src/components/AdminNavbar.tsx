import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Адмін панель
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/admin">
            Статистика
          </Button>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Графіки
          </Button>
          <Button color="inherit" component={Link} to="/admin/confirm">
            Підтвердити показники
          </Button>
          <Button color="inherit" component={Link} to="/emergencies/create">
            Керування аваріями
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
