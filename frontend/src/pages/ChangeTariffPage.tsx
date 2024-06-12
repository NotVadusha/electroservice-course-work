import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import TariffCard from "../components/TariffCard";
import { useQuery } from "@tanstack/react-query";
import localhostInstance from "../httpService";

interface Tariff {
  name: string;
  description: string;
  current: boolean;
}

const ChangeTariffPage = () => {
  const { data } = useQuery({
    queryKey: ["tariffs"],
    queryFn: async () =>
      (
        await localhostInstance.get<Tariff[]>(
          `/contracts/get-tariffs/${localStorage.getItem("clientId")}`,
        )
      ).data,
  });

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant={"h4"} textAlign={"center"} p={4}>
          Оберіть тариф, що цікавить вас!
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
          {data?.map((tarriff) => (
            <TariffCard
              text={tarriff.name}
              description={tarriff.description}
              current={tarriff.current}
            />
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default ChangeTariffPage;
