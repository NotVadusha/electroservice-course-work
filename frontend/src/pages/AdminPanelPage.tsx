import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import localhostInstance from "../httpService"; // Axios instance

interface Client {
  id: number;
  email: string;
  street: string;
  emergencyCount: number;
  lastEmergency: string;
  tariffId: number;
}

interface Tariff {
  id: number;
  name: string;
}

interface Contract {
  id: number;
  clientId: number;
  tariffId: number;
}

const AdminPanel: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("emergencyCount");
  const [filterName, setFilterName] = useState("");
  const [filterTariff, setFilterTariff] = useState<number | "">("");
  const [filterPeriod, setFilterPeriod] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const [clientsRes, tariffsRes, contractsRes] = await Promise.all([
        localhostInstance.get("/clients"),
        localhostInstance.get(
          `/contracts/get-tariffs/${localStorage.getItem("clientId")}`,
        ),
        localhostInstance.get("/contracts"),
      ]);

      setClients(clientsRes.data);
      setTariffs(tariffsRes.data);
      setContracts(contractsRes.data);
    };

    fetchData();
  }, []);

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | {
          name?: string;
          value: unknown;
        }
    >,
  ) => {
    const { name, value } = event.target;
    if (name === "name") {
      setFilterName(value as string);
    } else if (name === "tariff") {
      setFilterTariff(value as number);
    } else if (name === "period") {
      setFilterPeriod(value as number);
    }
  };

  const filteredClients = clients
    .filter(
      (client) =>
        client.email.toLowerCase().includes(filterName.toLowerCase()) &&
        (filterTariff === "" || client.tariffId === filterTariff),
    )
    .filter((client) => {
      if (filterPeriod === 0) return true;
      const periodDate = new Date();
      periodDate.setDate(periodDate.getDate() - filterPeriod);
      return new Date(client.lastEmergency) >= periodDate;
    });

  const sortedClients = filteredClients.slice().sort((a, b) => {
    if (orderBy === "emergencyCount") {
      return order === "asc"
        ? a.emergencyCount - b.emergencyCount
        : b.emergencyCount - a.emergencyCount;
    }
    return 0;
  });

  const clientContractCounts = clients.map((client) => ({
    ...client,
    contractCount: contracts.filter(
      (contract) => contract.clientId === client.id,
    ).length,
  }));

  const sortedClientContractCounts = clientContractCounts
    .slice()
    .sort((a, b) => {
      return order === "asc"
        ? a.contractCount - b.contractCount
        : b.contractCount - a.contractCount;
    });

  const clientsWithNoEmergencies = clients.filter(
    (client) => client.emergencyCount === 0,
  );

  const clientWithMostOutages = clients.reduce(
    (prev, current) =>
      prev.emergencyCount > current.emergencyCount ? prev : current,
    clients[0],
  );

  return (
    <div>
      <Navbar />
      <AdminNavbar />
      <Container>
        <Box py={2}>
          <Typography component={"h2"} variant="h4" fontWeight={600}>
            Пошук клієнтів
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Пошук за ім'ям"
              name="name"
              value={filterName}
              onChange={handleFilterChange}
              variant="outlined"
              margin="normal"
            />
            <FormControl variant="outlined" margin="normal">
              <InputLabel id="tariff-label">Тариф</InputLabel>
              <Select
                labelId="tariff-label"
                name="tariff"
                value={filterTariff}
                onChange={handleFilterChange}
                label="Tariff"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {tariffs.map((tariff) => (
                  <MenuItem key={tariff.id} value={tariff.id}>
                    {tariff.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Період (днів)"
              name="period"
              type="number"
              value={filterPeriod}
              onChange={handleFilterChange}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Вулиця</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "emergencyCount"}
                      direction={order}
                      onClick={() => handleSortRequest("emergencyCount")}
                    >
                      Аварії
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.emergencyCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Кількість клієнтів за кількістю контрактів
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ім'я</TableCell>
                  <TableCell>Вулиця</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "contractCount"}
                      direction={order}
                      onClick={() => handleSortRequest("contractCount")}
                    >
                      Кількість контрактів
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedClientContractCounts.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.contractCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Клієнти з найбільшою кількістю контрактів за певним тарифом
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Тариф</TableCell>
                  <TableCell>Ім'я клієнта</TableCell>
                  <TableCell>Кількість контрактів</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tariffs.map((tariff) =>
                  clients
                    .filter((client) =>
                      contracts.some(
                        (contract) =>
                          contract.clientId === client.id &&
                          contract.tariffId === tariff.id,
                      ),
                    )
                    .sort(
                      (a, b) =>
                        contracts.filter(
                          (contract) =>
                            contract.clientId === b.id &&
                            contract.tariffId === tariff.id,
                        ).length -
                        contracts.filter(
                          (contract) =>
                            contract.clientId === a.id &&
                            contract.tariffId === tariff.id,
                        ).length,
                    )
                    .slice(0, 1)
                    .map((client) => (
                      <TableRow key={`${tariff.id}-${client.id}`}>
                        <TableCell>{tariff.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          {
                            contracts.filter(
                              (contract) =>
                                contract.clientId === client.id &&
                                contract.tariffId === tariff.id,
                            ).length
                          }
                        </TableCell>
                      </TableRow>
                    )),
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Замовники в котрих не було вимкнень нещодавно
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Вулиця</TableCell>
                  <TableCell>Аварії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientsWithNoEmergencies.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.emergencyCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Клієнт з найбільшою кількістю вимкнень
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Вулиця</TableCell>
                  <TableCell>Аварії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {clientWithMostOutages && (
                    <>
                      {" "}
                      <TableCell>{clientWithMostOutages.email}</TableCell>
                      <TableCell>{clientWithMostOutages.street}</TableCell>
                      <TableCell>
                        {clientWithMostOutages.emergencyCount}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default AdminPanel;
