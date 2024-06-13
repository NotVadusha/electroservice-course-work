import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import localhostInstance from "../httpService"; // Assuming you have an axios instance configured

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboardsPage: React.FC = () => {
  const { data: tariffs, isLoading: tariffsLoading } = useQuery({
    queryKey: ["tariffs"],
    queryFn: () =>
      localhostInstance.get(
        `/contracts/get-tariffs/${localStorage.getItem("clientId")}`,
      ),
  });

  const { data: contracts, isLoading: contractsLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => localhostInstance.get("/contracts"),
  });

  const { data: newClients, isLoading: newClientsLoading } = useQuery({
    queryKey: ["newClients"],
    queryFn: () => localhostInstance.get("/contracts/new-clients"),
  });

  if (tariffsLoading || contractsLoading || newClientsLoading) {
    return <Typography>Loading...</Typography>;
  }

  const tariffPopularityData = {
    labels: tariffs?.data.map((tariff: { name: string }) => tariff.name),
    datasets: [
      {
        label: "Number of Contracts",
        data: tariffs?.data.map(
          (tariff: { id: string }) =>
            contracts?.data.filter(
              (contract: { tariff_id: string }) =>
                contract.tariff_id === tariff.id,
            ).length,
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const newClientsData = {
    labels: newClients?.data.map((item: { date: Date }) => item.date),
    datasets: [
      {
        label: "New Clients",
        data: newClients?.data.map((item: { count: number }) => item.count),
        backgroundColor: "rgba(53, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <AdminNavbar />
      <Container>
        <Box>
          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Популярність тарифів
          </Typography>
          <Bar options={options} data={tariffPopularityData} />
        </Box>
        <Box mt={4}>
          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Ріст нових клієнтів за тиджень
          </Typography>
          <Bar options={options} data={newClientsData} />
        </Box>
      </Container>
    </div>
  );
};

export default AdminDashboardsPage;
