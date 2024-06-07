import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AddCounterNumbersPage = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant={"h4"} textAlign={"center"} p={4}>
          Внесіть інформацію про показльники лічильників
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Counter Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {months.map((month) => (
                <TableRow key={month}>
                  <TableCell component="th" scope="row">
                    {month}
                  </TableCell>
                  <TableCell align="right">
                    <TextField type="number" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default AddCounterNumbersPage;
