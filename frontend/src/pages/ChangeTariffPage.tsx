import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import TariffCard from "../components/TariffCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import localhostInstance from "../httpService";

interface Tariff {
  id: string;
  name: string;
  description: string;
  current: boolean;
}

const ChangeTariffPage = () => {
  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["tariffs"],
    queryFn: async () =>
      (
        await localhostInstance.get<Tariff[]>(
          `/contracts/get-tariffs/${localStorage.getItem("clientId")}`,
        )
      ).data,
  });

  const { mutate: updateTariff } = useMutation({
    mutationKey: ["Update tariff"],
    mutationFn: (tariffId: string) => {
      return localhostInstance.patch(
        `/contracts/change-tariff/${localStorage.getItem(
          "clientId",
        )}?tariffId=${tariffId}`,
      );
    },
    onSuccess: () => refetch(),
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
          {!isRefetching &&
            !isLoading &&
            data?.map((tarriff) => (
              <TariffCard
                text={tarriff.name}
                description={tarriff.description}
                current={tarriff.current}
                handleUpdate={() => updateTariff(tarriff.id)}
              />
            ))}
        </Box>
      </Container>
    </div>
  );
};

export default ChangeTariffPage;
