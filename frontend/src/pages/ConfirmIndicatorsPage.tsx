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
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useQuery, useMutation } from "@tanstack/react-query";
import localhostInstance from "../httpService";
import AdminNavbar from "../components/AdminNavbar";

interface CounterIndicator {
  indicator_id: string;
  month: string;
  status: string;
  usage: number;
  first_name: string;
  last_name: string;
}

const ConfirmIndicatorsPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["counterIndicators"],
    queryFn: () => localhostInstance.get("/clients/counter-indicators"),
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) =>
      localhostInstance.get(`/clients/confirm-counter-indicators/${id}`),
    onSuccess: () => {
      refetch();
    },
  });

  const handleConfirm = (id: string) => {
    confirmMutation.mutate(id);
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
      <AdminNavbar />
      <Container>
        <Typography variant={"h4"} textAlign={"center"} p={4}>
          Підтвердження показників лічильників
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Клієнт</TableCell>
                <TableCell>Місяць</TableCell>
                <TableCell align="right">Показники</TableCell>
                <TableCell align="right">Статус</TableCell>
                <TableCell align="right">Дія</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((indicator: CounterIndicator) => {
                const bgColor =
                  indicator.status === "completed"
                    ? "green"
                    : indicator.status === "pending"
                    ? "orange"
                    : "red";

                return (
                  <TableRow key={indicator.indicator_id}>
                    <TableCell component="th" scope="row">
                      {indicator.first_name} {indicator.last_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {indicator.month}
                    </TableCell>
                    <TableCell align="right">{indicator.usage}</TableCell>
                    <TableCell align="right" sx={{ backgroundColor: bgColor }}>
                      {indicator.status}
                    </TableCell>
                    <TableCell align="right">
                      {indicator.status !== "completed" && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleConfirm(indicator.indicator_id)}
                        >
                          Підтвердити
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ConfirmIndicatorsPage;
