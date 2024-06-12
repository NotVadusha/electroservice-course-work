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
  Box,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import localhostInstance from "../httpService";

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

interface CounterIndicator {
  month: string;
  status: string;
  usage: number;
  clientId: string;
}

const AddCounterNumbersPage = () => {
  const [indicators, setIndicators] = useState<
    Record<string, CounterIndicator>
  >({});

  const { data, isLoading, error, refetch, isError } = useQuery({
    queryKey: ["counterIndicators"],
    queryFn: () => localhostInstance.get("/clients/counter-indicators"),
  });

  const mutation = useMutation({
    mutationFn: () =>
      localhostInstance.post("/clients/save-counter-indicators", indicators),
    onSuccess: () => {
      refetch();
    },
  });

  const handleInputChange = (month: string, usage: number) => {
    setIndicators((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        usage,
        clientId: localStorage.getItem("clientId") ?? "",
      },
    }));
  };

  const handleSave = () => {
    mutation.mutate();
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant={"h4"} textAlign={"center"} p={4}>
          Внесіть інформацію про показники лічильників
        </Typography>{" "}
        <Typography variant={"h5"} textAlign={"center"} p={4}>
          Після внесення показників змінити їх буде неможливо
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Місяць</TableCell>
                <TableCell align="right">Показники</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {months.map((month) => {
                const indicator =
                  data?.data || !isError
                    ? data?.data.find(
                        (item: CounterIndicator) => item.month === month,
                      )
                    : null;
                const bgColor = !indicator
                  ? "red"
                  : indicator.status === "confirmed"
                  ? "green"
                  : "orange";

                return (
                  <TableRow key={month}>
                    <TableCell component="th" scope="row">
                      {month}
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        disabled={indicator}
                        type="number"
                        value={
                          indicators[month]?.usage || indicator?.usage || ""
                        }
                        onChange={(e) =>
                          handleInputChange(month, Number(e.target.value))
                        }
                        sx={{ backgroundColor: bgColor }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" p={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Зберегти
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AddCounterNumbersPage;
