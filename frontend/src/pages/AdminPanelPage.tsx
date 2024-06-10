import React, { useState } from "react";
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

const initialClients = [
  {
    id: 1,
    name: "John Doe",
    street: "Main St",
    emergencyCount: 5,
    tariffId: 1,
    lastEmergency: "2024-06-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    street: "High St",
    emergencyCount: 2,
    tariffId: 2,
    lastEmergency: "2024-06-01",
  },
  {
    id: 3,
    name: "Alice Johnson",
    street: "Low St",
    emergencyCount: 3,
    tariffId: 1,
    lastEmergency: "2024-06-01",
  },
];

const initialTariffs = [
  { id: 1, name: "Standard", rate: 10 },
  { id: 2, name: "Premium", rate: 20 },
  { id: 3, name: "Basic", rate: 5 },
];

const initialContracts = [
  { id: 1, clientId: 1, tariffId: 1 },
  { id: 2, clientId: 2, tariffId: 2 },
  { id: 3, clientId: 3, tariffId: 3 },
  { id: 4, clientId: 1, tariffId: 2 },
  { id: 5, clientId: 1, tariffId: 1 },
];

const AdminPanel: React.FC = () => {
  const [clients, setClients] = useState(initialClients);
  const [tariffs, setTariffs] = useState(initialTariffs);
  const [contracts, setContracts] = useState(initialContracts);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("emergencyCount");
  const [filterName, setFilterName] = useState("");
  const [filterTariff, setFilterTariff] = useState<number | "">("");
  const [filterPeriod, setFilterPeriod] = useState<number>(0);

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
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
        client.name.toLowerCase().includes(filterName.toLowerCase()) &&
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
      <Container>
        <Box py={2}>
          <Typography component={"h2"} variant="h4" fontWeight={600}>
            Search Clients
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Filter by Name"
              name="name"
              value={filterName}
              onChange={handleFilterChange}
              variant="outlined"
              margin="normal"
            />
            <FormControl variant="outlined" margin="normal">
              <InputLabel id="tariff-label">Tariff</InputLabel>
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
              label="Period (days)"
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
                  <TableCell>Name</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "emergencyCount"}
                      direction={order}
                      onClick={() => handleSortRequest("emergencyCount")}
                    >
                      Emergency Situations
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.emergencyCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Contracts by Number of Contracts
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "contractCount"}
                      direction={order}
                      onClick={() => handleSortRequest("contractCount")}
                    >
                      Number of Contracts
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedClientContractCounts.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.contractCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Clients with the Most Contracts for a Particular Rate
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tariff</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Number of Contracts</TableCell>
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
                        <TableCell>{client.name}</TableCell>
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
            Customers with No Emergencies Recently
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Emergency Situations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientsWithNoEmergencies.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.emergencyCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Customer with the Highest Number of Outages
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Emergency Situations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{clientWithMostOutages.name}</TableCell>
                  <TableCell>{clientWithMostOutages.street}</TableCell>
                  <TableCell>{clientWithMostOutages.emergencyCount}</TableCell>
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
