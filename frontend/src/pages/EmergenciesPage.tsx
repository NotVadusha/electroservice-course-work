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

const cities = ["Одеса", "Київ", "Львів"];
const streets = ["Велика Арнаутська", "Мала Арнаутська", "Дерибасівська"];
const houses = ["1", "2", "3"];

const EmergenciesPage = () => {
  const [selectedCity, _setSelectedCity] = useState<string | null>(null);
  const [selectedStreet, _setSelectedStreet] = useState<string | null>(null);
  const [selectedHouse, _setSelectedHouse] = useState<string | null>(null);

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

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const getRandomElectricityStatus = () => Math.random() > 0.5;

  return (
    <div>
      <Navbar />
      <Container>
        <Box p={4}>
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
                {cities.map((city) => (
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
                {streets.map((street) => (
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
                {houses.map((house) => (
                  <MenuItem value={house}>{house}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
              {hours.map((hour, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{hour}</TableCell>
                  {days.map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        bgcolor: getRandomElectricityStatus() ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {getRandomElectricityStatus() ? "Yes" : "No"}
                    </TableCell>
                  ))}
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
