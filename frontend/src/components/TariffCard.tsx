import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

interface TariffCardProps {
  text: string;
  description: string;
  current?: boolean;
}

const TariffCard: FC<TariffCardProps> = ({
  description,
  text,
  current = false,
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"fit-content"}
      boxShadow={2}
      borderRadius={2}
    >
      <Typography textAlign={"center"} p={4}>
        {text}
      </Typography>
      <Typography textAlign={"center"} p={4}>
        {description}
      </Typography>
      <Button variant={"contained"} disabled={!current}>
        {current ? "Обрати" : "Поточний тариф"}
      </Button>
    </Box>
  );
};

export default TariffCard;
