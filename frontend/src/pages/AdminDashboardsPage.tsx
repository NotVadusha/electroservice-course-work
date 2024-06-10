import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboardsPage: React.FC = () => {
  // Mock Data
  const tariffs = [
    { id: 1, name: "Standard", rate: 10 },
    { id: 2, name: "Premium", rate: 20 },
    { id: 3, name: "Basic", rate: 5 },
  ];

  const contracts = [
    { id: 1, clientId: 1, tariffId: 1 },
    { id: 2, clientId: 2, tariffId: 2 },
    { id: 3, clientId: 3, tariffId: 3 },
    { id: 4, clientId: 1, tariffId: 2 },
    { id: 5, clientId: 4, tariffId: 1 },
    { id: 6, clientId: 5, tariffId: 1 },
    { id: 7, clientId: 6, tariffId: 2 },
  ];

  const newClients = [
    { date: "2024-06-01", count: 3 },
    { date: "2024-06-02", count: 5 },
    { date: "2024-06-03", count: 2 },
    { date: "2024-06-04", count: 6 },
    { date: "2024-06-05", count: 4 },
    { date: "2024-06-06", count: 7 },
    { date: "2024-06-07", count: 8 },
  ];

  const tariffPopularityData = {
    labels: tariffs.map((tariff) => tariff.name),
    datasets: [
      {
        label: "Number of Contracts",
        data: tariffs.map(
          (tariff) =>
            contracts.filter((contract) => contract.tariffId === tariff.id)
              .length,
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const newClientsData = {
    labels: newClients.map((item) => item.date),
    datasets: [
      {
        label: "New Clients",
        data: newClients.map((item) => item.count),
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
      <Container>
        <Box>
          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            Tariffs Popularity
          </Typography>
          <Bar options={options} data={tariffPopularityData} />
        </Box>
        <Box mt={4}>
          <Typography component={"h2"} variant="h4" fontWeight={600} py={2}>
            New Clients per Week
          </Typography>
          <Bar options={options} data={newClientsData} />
        </Box>
      </Container>
    </div>
  );
};

export default AdminDashboardsPage;
