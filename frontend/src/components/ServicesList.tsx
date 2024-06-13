import { Box, Link, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DvrIcon from "@mui/icons-material/Dvr";

const ServicesList = () => {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Link href="/emergencies">
        <Box
          display={"flex"}
          width={"fit-content"}
          alignItems={"center"}
          bgcolor={"rgba(150,40,20,0.2)"}
          color={"black"}
        >
          <Box p={4}>
            <LightbulbIcon />
          </Box>
          <Box p={4}>
            <Typography>Переглянути графіки вимкнень</Typography>
          </Box>
        </Box>
      </Link>
      <Link href="/receive-numbers">
        <Box
          display={"flex"}
          width={"fit-content"}
          bgcolor={"rgba(150,40,20,0.2)"}
          alignItems={"center"}
          color={"black"}
        >
          <Box p={4}>
            <DvrIcon />
          </Box>
          <Box p={4}>
            <Typography>Передати показники лічільників</Typography>
          </Box>
        </Box>
      </Link>
      <Link href="/support">
        <Box
          display={"flex"}
          width={"fit-content"}
          bgcolor={"rgba(150,40,20,0.2)"}
          alignItems={"center"}
          color={"black"}
        >
          <Box p={4}>
            <SettingsIcon />
          </Box>
          <Box p={4}>
            <Typography>Допомога з налаштування лічільнику</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ServicesList;
