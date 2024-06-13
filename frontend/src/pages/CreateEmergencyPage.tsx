import { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import localhostInstance from "../httpService";
import Navbar from "../components/Navbar";

interface Emergency {
  id: string;
  description: string;
  status: string;
  created_at: string;
  expected_fix_date: string;
}

interface CreateEmergencyMutation {
  description: string;
  client_id: string;
}

interface UpdateEmergencyMutation {
  id: string;
  status: string;
  expected_fix_date: string;
}

const EmergencyPage = () => {
  const [description, setDescription] = useState("");
  const isUserAnAdmin = localStorage.getItem("isAdmin") === "true";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["emergencies"],
    queryFn: () =>
      localhostInstance.get("/emergencies", {
        params: {
          admin: isUserAnAdmin,
          clientId: localStorage.getItem("clientId") ?? "",
        },
      }),
  });

  const createEmergencyMutation = useMutation({
    mutationFn: (newEmergency: CreateEmergencyMutation) =>
      localhostInstance.post("/emergencies", newEmergency),
    onSuccess: () => {
      refetch();
    },
  });

  const updateEmergencyMutation = useMutation({
    mutationFn: ({ id, status, expected_fix_date }: UpdateEmergencyMutation) =>
      localhostInstance.put(`/emergencies/${id}`, {
        status,
        expected_fix_date,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteEmergencyMutation = useMutation({
    mutationFn: (id: string) => localhostInstance.delete(`/emergencies/${id}`),
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateEmergency = () => {
    createEmergencyMutation.mutate({
      description,
      client_id: localStorage.getItem("clientId") ?? "",
    });
    setDescription("");
  };

  const handleUpdateEmergency = (updateDto: UpdateEmergencyMutation) => {
    updateEmergencyMutation.mutate(updateDto);
  };

  const handleDeleteEmergency = (id: string) => {
    deleteEmergencyMutation.mutate(id);
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
        <Typography variant="h4" textAlign="center" p={4}>
          Керування скаргами
        </Typography>
        <Box p={2}>
          <TextField
            label="Опишіть аварію"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box display="flex" justifyContent="center" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateEmergency}
            >
              Повідомити про аварію
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Опис</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Створена</TableCell>
                <TableCell>Очікуване відновлення</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((emergency: Emergency) => (
                <TableRow key={emergency.id}>
                  <TableCell>{emergency.id}</TableCell>
                  <TableCell>{emergency.description}</TableCell>
                  <TableCell>
                    {isUserAnAdmin ? (
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={emergency.status}
                          onChange={(e) =>
                            handleUpdateEmergency({
                              id: emergency.id,
                              status: e.target.value,
                              expected_fix_date: emergency.expected_fix_date,
                            })
                          }
                        >
                          <MenuItem value="pending">Підтверджується</MenuItem>
                          <MenuItem value="in-progress">Лагодиться</MenuItem>
                          <MenuItem value="resolved">Полагоджено</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      emergency.status
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(emergency.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {isUserAnAdmin ? (
                      <TextField
                        type="date"
                        defaultValue={
                          new Date(emergency.expected_fix_date)
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={(e) =>
                          handleUpdateEmergency({
                            id: emergency.id,
                            status: emergency.status,
                            expected_fix_date: e.target.value,
                          })
                        }
                      />
                    ) : (
                      new Date(emergency.expected_fix_date).toLocaleString()
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteEmergency(emergency.id)}
                      disabled={!isUserAnAdmin}
                    >
                      Видалити
                    </Button>
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

export default EmergencyPage;
