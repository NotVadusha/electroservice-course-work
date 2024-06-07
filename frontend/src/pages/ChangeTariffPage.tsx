import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import TariffCard from "../components/TariffCard";
const Tarriffs = [
  {
    text: "Тариф 1",
    description: "Опис тарифу 1",
  },
  {
    text: "Тариф 2",
    description: "Опис тарифу 2",
  },
  {
    text: "Тариф 3",
    description: "Опис тарифу 3",
  },
  {
    text: "Тариф 4",
    description: "Опис тарифу 4",
  },
  {
    text: "Тариф 5",
    description: "Опис тарифу 5",
  },
  {
    text: "Тариф 6",
    description: "Опис тарифу 6",
  },
  {
    text: "Тариф 7",
    description: "Опис тарифу 7",
  },
  {
    text: "Тариф 8",
    description: "Опис тарифу 8",
  },
  {
    text: "Тариф 9",
    description: "Опис тарифу 9",
  },
  {
    text: "Тариф 10",
    description: "Опис тарифу 10",
  },
];

const ChangeTariffPage = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant={"h4"} textAlign={"center"} p={4}>
          Оберіть тариф, що цікавить вас!{" "}
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={16}
          p={8}
          pt={0}
          flexWrap={"wrap"}
          justifyItems={"center"}
          justifyContent={"space-evenly"}
        >
          {/*Current tariff*/}
          <TariffCard
            text={Tarriffs[0].text}
            description={Tarriffs[0].description}
          />

          {Tarriffs.map((tarriff) => (
            <TariffCard text={tarriff.text} description={tarriff.description} />
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default ChangeTariffPage;
