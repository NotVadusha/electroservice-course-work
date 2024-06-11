import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import localhostInstance from "../httpService";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);
const days = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
  "Неділя",
];

const EmergenciesPage = () => {
  const [selectedCity, _setSelectedCity] = useState<string | null>(null);
  const [selectedStreet, _setSelectedStreet] = useState<string | null>(null);
  const [selectedHouse, _setSelectedHouse] = useState<string | null>(null);

  const { data: emergenciesData, isLoading: emergenciesLoading } = useQuery({
    queryKey: ["emergencies", selectedCity, selectedStreet, selectedHouse],
    queryFn: () =>
      localhostInstance.get("/emergencies/emergencies-by-address", {
        params: {
          city: selectedCity,
          street: selectedStreet,
          number: selectedHouse,
        },
      }),
  });

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => localhostInstance.get("/clients/addresses"),
  });

  const setSelectedCity = (value: string) => {
    _setSelectedCity(value);
    _setSelectedStreet(null);
    _setSelectedHouse(null);
  };

  const setSelectedStreet = (value: string) => {
    _setSelectedStreet(value);
    _setSelectedHouse(null);
  };

  const setSelectedHouse = (value: string) => {
    _setSelectedHouse(value);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box p={4}>
          {!isLoading && addresses?.data && (
            <Box display="flex" gap={8}>
              <FormControl fullWidth>
                <InputLabel id="city-input-label">Місто</InputLabel>
                <Select
                  labelId="city-input-label"
                  id="city-input"
                  value={selectedCity}
                  label="Місто"
                  onChange={(value) =>
                    setSelectedCity(value.target.value as string)
                  }
                >
                  {Object.keys(addresses.data).map((city) => (
                    <MenuItem value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="street-input-label">Вулиця</InputLabel>
                <Select
                  disabled={!selectedCity}
                  labelId="street-input-label"
                  id="street-input"
                  value={selectedStreet}
                  label="Вулиця"
                  onChange={(value) =>
                    setSelectedStreet(value.target.value as string)
                  }
                >
                  {(selectedCity
                    ? Object.keys(addresses.data[selectedCity])
                    : []
                  ).map((street) => (
                    <MenuItem value={street}>{street}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Номер будинку
                </InputLabel>
                <Select
                  disabled={!selectedStreet}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedHouse}
                  label="Номер будинку"
                  autoWidth
                  onChange={(value) =>
                    setSelectedHouse(value.target.value as string)
                  }
                >
                  {(selectedCity && selectedStreet
                    ? addresses.data[selectedCity][selectedStreet]
                    : []
                  ).map((house: number) => (
                    <MenuItem value={house}>{house}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hour</TableCell>
                {days.map((day, index) => (
                  <TableCell key={index}>{day}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!emergenciesLoading &&
                emergenciesData &&
                hours.map((hour, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{hour}</TableCell>
                    {days.map((_, colIndex) => {
                      const dayDate = new Date();
                      dayDate.setDate(dayDate.getDate() + colIndex);
                      dayDate.setHours(rowIndex);
                      console.log(dayDate);
                      const emergency = emergenciesData.data.find(
                        (emergency: {
                          created_at: Date;
                          expected_fix_date: Date;
                        }) =>
                          new Date(emergency.created_at) <= dayDate &&
                          new Date(emergency.expected_fix_date) >= dayDate,
                      );
                      if (emergency) {
                        return (
                          <TableCell
                            key={colIndex}
                            sx={{
                              bgcolor: "red",
                              color: "white",
                            }}
                          >
                            {"Not"}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={colIndex}
                            sx={{
                              bgcolor: "green",
                              color: "white",
                            }}
                          >
                            {"Yes"}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default EmergenciesPage;
