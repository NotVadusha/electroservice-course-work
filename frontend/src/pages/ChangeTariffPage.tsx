import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const ChangeTariffPage = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Box>
          <Box>
            <image></image>
            <Typography>Tariff name</Typography>
            <Typography>desc</Typography>
            <Button>Connect</Button>
          </Box>
          <Box>
            <image></image>
            <Typography>Tariff name</Typography>
            <Typography>desc</Typography>
            <Button>Connect</Button>
          </Box>
          <Box>
            <image></image>
            <Typography>Tariff name</Typography>
            <Typography>desc</Typography>
            <Button>Connect</Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ChangeTariffPage;
